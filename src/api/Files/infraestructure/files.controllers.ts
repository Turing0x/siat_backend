import { Response, Request } from "express";
import fs from "fs";
import archiver from "archiver";

async function getAllFiles(req: Request, res: Response) {
  try {
    const files = fs.readdirSync("./files/", { recursive: true }) as Buffer[];
    const filesData = files.map((file) => {
      if (fs.statSync(`./files/${file}`).isFile()) {
        const path = file.toString().split("\\");

        const content = fs.readFileSync(`./files/${file}`);
        return {
          file_name: path[path.length - 1],
          full_path: `./files/${path.slice(0, path.length - 1).join("\\")}`,
          content: content.toString(),
        };
      }

      return null;
    });

    return res.json({
      success: true,
      data: filesData.filter((file) => file !== null),
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      data: error,
    });
  }
}

async function saveFile(req: Request, res: Response) {
  const { full_path, content } = req.body;

  try {
    fs.writeFile(full_path, content, (err) => {
      if (err) {
        return res.status(404).json({
          success: false,
          data: err,
        });
      }
    });

    return res.json({
      success: true,
      data: "File saved",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      data: [],
    });
  }
}

async function sendFileToFront(req: Request, res: Response) {
  try {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const stream = fs.createWriteStream("./uploads/files.zip");

    return new Promise((resolve, reject) => {
      archive
        .directory("./files/", false)
        .on("error", (err) => reject(err))
        .pipe(stream);

      stream.on("close", () => {
        resolve("File saved");
        return res.download("./uploads/files.zip");
      });
      archive.finalize();
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

export const FilesControllers = {
  sendFileToFront,
  getAllFiles,
  saveFile,
};
