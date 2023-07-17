import { Router } from "express";
import contactFinderController from "../controllers/contactFinderController.js";
import multer from "multer";

const routes = Router();

const storageTXT = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsTXT/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = `links${new Date().toISOString().replace(/:/g, "-")}`

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const storageCSV = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsCSV/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = `links${new Date().toISOString().replace(/:/g, "-")}`

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const uploadTXT = multer({ storage: storageTXT }).single('txt');
const uploadCSV = multer({ storage: storageCSV }).single('csv');

routes.get("/", (req, res) => { res.send("Hello world") });
routes.get("/infoFinder", contactFinderController.infoFinder);
routes.get("/findMany", contactFinderController.findInfoInManyURLs);
routes.post("/findManyByTXT", uploadTXT, contactFinderController.findInfoInManyURLsProvidedByTxt);
routes.post("/findManyByCSV", uploadCSV, contactFinderController.findInfoInManyURLsProvidedByCSV);

export { routes }
