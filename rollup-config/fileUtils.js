import { render } from "node-sass";
import path from 'path';
import mkdirp from 'mkdirp';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';


export function buildFileExtension(id){
	const filename = path.parse(id).base;	
	return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;

}

export const renderSass = (options) => new Promise((resolve, reject) => render(options,(err, res) => {
    if (err)
        return reject(err);
    return resolve(res);
}));

export function run_postcss(css, id)
{
    const options = {
        from : id
    };

    const processor =  postcss([autoprefixer]);

    return new Promise((resolve, reject) =>{
        
        const lazy = processor.process(css, options);
        
        lazy.then( (result) => { 
           
            resolve(result.css); 
        }).catch(error => { reject(error); });
    });
}
