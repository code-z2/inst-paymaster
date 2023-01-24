import {WeaveDBUserObject} from "iron-session";
import {SiweMessage} from "siwe";

class MockIronStore {
    private static instance: MockIronStore;

    private saved: {[key: string]: string | object | number | undefined};

    private unsaved: {[key: string]: string | object | number | undefined};

    siwe: SiweMessage | undefined;
    nonce: string | undefined;
    issuedAt: string | undefined;
    expirationTime: string | undefined;
    weavedbUser: WeaveDBUserObject | undefined;

    private constructor() {
        this.saved = {};
        this.unsaved = {};
    }

    static getOrCreateStore(): MockIronStore {
        if (!MockIronStore.instance) {
            MockIronStore.instance = new MockIronStore();
        }
        return MockIronStore.instance;
    }

    get(key: string) {
        return this.unsaved[key] || undefined;
    }

    set(key: string, val: string | object | number) {
        this.unsaved[key] = val;
    }

    unset(key: string) {
        delete this.unsaved[key];
    }

    seal() {
        this.saved = {...this.unsaved};
    }

    clear() {
        this.unsaved = {};
        this.siwe = undefined;
    }

    destroy() {
        this.clear();
    }

    save() {
        this.seal();
    }
}

function throwOnNoCookieName() {
    throw new Error("next-iron-session: Missing parameter `cookieName`");
}

const applySession = jest.fn().mockImplementation((req) => {
    req.session = MockIronStore.getOrCreateStore();
});

export default {MockIronStore};

module.exports = {
    throwOnNoCookieName: jest.fn().mockImplementation(),
    applySession,
    withIronSession: jest
        .fn()
        .mockImplementation(
            (
                withIronSessionWrapperHandler,
                {ttl = 15 * 24 * 3600, cookieName = throwOnNoCookieName(), cookieOptions = {}}
            ) => {
                return jest.fn().mockImplementation((...args) => {
                    const handlerType = args[0] && args[1] ? "api" : "ssr";
                    const req = handlerType === "api" ? args[0] : args[0].req;
                    const res = handlerType === "api" ? args[1] : args[0].res;

                    applySession(req, res, {ttl, cookieName, cookieOptions});

                    return withIronSessionWrapperHandler(...args);
                });
            }
        ),
};
