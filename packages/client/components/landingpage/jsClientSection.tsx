import React from "react";
import { Image } from "../";
import styles from "../../styles/landing/jsclientsection.module.css"

function jsClientSection() {
  return (
    <div className={styles.js_client_section}>
      <div className={styles.clients_content }>
        <div className="px-5">
          <h5 className="">JS Client Library</h5>
          <p className="text-slate-400 text-sm flex justify-start">
            Lorem ipsum dolor sit amet consectetur. Sit lectus ac et turpis eu
            ultricies odio praesent in.
          </p>
          <p className="flex justify-start text-jsClientGlow align-middle content-center p-2">
            <span>
              <Image
                className="mr-2"
                src="/assets/pm-icons/npm.png"
                alt="paymaster JS docs"
                blurDataURL="/assets/pm-icons/npm.png"
                width={48}
                height={20}
                object-fit="cover"
                priority
              />
            </span>
            Js docs
          </p>
        </div>
        <div className="px-5">
          <h5 className="text-center">HTTP API</h5>
          <p className="text-slate-400 text-sm">
            Lorem ipsum dolor sit amet consectetur. Sit lectus ac et turpis eu
            ultricies odio praesent in.
          </p>
          <p className="flex justify-start text-jsClientGlow align-middle content-center p-2">
            <span>
              <Image
                className="mr-2"
                src="/assets/pm-icons/code-braces.png"
                alt="paymaster http API"
                blurDataURL="/assets/pm-icons/code-braces.png"
                width={48}
                height={20}
                object-fit="cover"
                priority
              />
            </span>
            HTTP Docs
          </p>
        </div>
        <div className="px-5">
          <h5 className="text-center">Web App</h5>
          <p className="text-slate-400 text-sm mb-1">
            Lorem ipsum dolor sit amet consectetur. Sit lectus ac et turpis eu
            ultricies odio praesent in.
          </p>
          <p className="flex justify-start text-jsClientGlow align-middle content-center p-2">
            <span>
              <Image
                className="mr-2"
                src="/assets/pm-icons/copy.png"
                alt="paymaster Web app"
                blurDataURL="/assets/pm-icons/copy.png"
                width={40}
                height={20}
                object-fit="cover"
                priority
              />
            </span>
            Make Your First Upload
          </p>
        </div>
      </div>
      <div className={`${styles.prog_langs} px-5`}>
        <h5 className="pl-1">Supported Languages</h5>
        <div className={`${styles.sub_prog_langs} w-full mt-3`}>
          <div>
            <a className="p-2 bg-jsClientDark rounded-md w-36 mx-3"> Nodejs</a>
          </div>
          <div>
            <a className="p-2 bg-jsClientDark rounded-md w-36 mx-3">Solidity</a>
          </div>
          <div>
            <a className="p-2 bg-jsClientDark rounded-md w-38 h-10  mx-3">
              {" "}
              Javascript
            </a>
          </div>
          <div>
            <a className="p-2 bg-jsClientDark rounded-md w-38 h-10 mx-3">
              {" "}
              Typescript
            </a>
          </div>
          <div>
            <a className="p-2 bg-jsClientDark rounded-md w-38 h-10 mx-3">
              {" "}
              Cairo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default jsClientSection;
