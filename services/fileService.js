const fs = require('fs')
const File = require('../models/File')
const config = require('../config/keys')

class FileService {

    createDir(file) {
        const filePath = `${config.filePath}\\${file.path}`        
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }
    createFile(file) {
        const filePath = `${config.filePath}\\${file.path}`        
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }

}


module.exports = new FileService()