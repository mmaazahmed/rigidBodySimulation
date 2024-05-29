import express from 'express'
import {Response,Request} from 'express'
const app= express()
const port = 8080;
// const getAbsolutePath=(fileName:string)=>{
//   const cwd=process.cwd();
//   // console.log("cwd",cwd)
//   // const lastSlashIndex = cwd.lastIndexOf('/');
//   // const absolutePath = lastSlashIndex !== -1 ? cwd.substring(0, lastSlashIndex + 1) : cwd;
//   const absolutePath = `${cwd}/`;
//   return absolutePath + fileName;
// }
app.use(express.static('dist'));
app.get('/',(req:Request,res:Response)=>{
  const indexPath = 'index.html';
  res.sendFile(indexPath, { root: process.cwd() });
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
