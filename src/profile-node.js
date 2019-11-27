const fs = require('fs');
const profiler = require('v8-profiler-node8');
const snapshot1 = profiler.takeSnapshot();
const snapshot2 = profiler.takeSnapshot();

console.log(snapshot1.getHeader(), snapshot2.getHeader());

console.log(snapshot1.compare(snapshot2));

// Export snapshot to file file
snapshot1.export(function(error, result) {
    fs.writeFileSync('snapshot1.json', result);
    snapshot1.delete();
});

// Export snapshot to file stream
snapshot2.export()
    .pipe(fs.createWriteStream('snapshot2.json'))
    .on('finish', snapshot2.delete);


profiler.startProfiling('1', true);
const profile1 = profiler.stopProfiling();
profiler.startProfiling('2', true);
const profile2 = profiler.stopProfiling();

console.log(snapshot1.getHeader(), snapshot2.getHeader());

profile1.export(function(error, result) {
    fs.writeFileSync('profile1.json', result);
    profile1.delete();
});

profile2.export()
    .pipe(fs.createWriteStream('profile2.json'))
    .on('finish', function() {
        profile2.delete();
    });