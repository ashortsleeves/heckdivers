import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const assetsDir = path.join(distDir, 'assets');

// Function to get the generated file names
function getGeneratedFileNames() {
    const files = fs.readdirSync(assetsDir);
    const cssFile = files.find(f => f.startsWith('index-') && f.endsWith('.css'));
    const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
    return { cssFile, jsFile };
}

// Function to modify file contents
function modifyFile(filePath, modifications) {
    let content = fs.readFileSync(filePath, 'utf8');
    modifications.forEach(({ search, replace }) => {
        content = content.replace(new RegExp(search, 'g'), replace);
    });
    fs.writeFileSync(filePath, content);
}

// Main process
try {
    console.log('🔨 Running post-build modifications for Wallpaper Engine...');
    
    // Get generated file names
    const { cssFile, jsFile } = getGeneratedFileNames();
    
    // Modify CSS file - remove all instances of /assets/
    if (cssFile) {
        console.log('📝 Modifying CSS file:', cssFile);
        modifyFile(path.join(assetsDir, cssFile), [
            { search: '/assets/', replace: '' }
        ]);
    } else {
        console.log('⚠️ No CSS file found');
    }

    // Modify JS file - replace /assets/ with assets/
    if (jsFile) {
        console.log('📝 Modifying JS file:', jsFile);
        modifyFile(path.join(assetsDir, jsFile), [
            { search: '/assets/', replace: 'assets/' }
        ]);
    } else {
        console.log('⚠️ No JS file found');
    }

    // Modify index.html
    console.log('📝 Modifying index.html...');
    const indexPath = path.join(distDir, 'index.html');
    modifyFile(indexPath, [
        { search: '/assets/', replace: 'assets/' },
        { search: ' crossorigin', replace: '' },
        { search: ' type="module"', replace: ' defer="defer"' }
    ]);

    // Rename index.html to heckdivers.html
    console.log('📝 Renaming index.html to heckdivers.html...');
    fs.renameSync(
        path.join(distDir, 'index.html'),
        path.join(distDir, 'heckdivers.html')
    );

    console.log('✅ Post-build modifications completed successfully!');
} catch (error) {
    console.error('❌ Error during post-build modifications:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
} 