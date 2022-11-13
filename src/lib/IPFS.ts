import { Web3Storage } from "web3.storage";

const token: string = process.env.REACT_APP_WEB3_STORAGE_API_KEY as string;
const client = new Web3Storage({ token });

export async function store(file: File) {
  const cid = await client.put([file]);
  return cid;
}

export async function retrieve(cid: string) {
  const res = await client.get(cid);
  const files = await res?.files();
  console.log(files);
}
