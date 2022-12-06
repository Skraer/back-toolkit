const getInstalledPackages = () => {
  // let arr = []
  return new Promise((resolve) => {
    require('child_process').exec(
      'npm ls --json',
      function (err, stdout, stderr) {
        if (err) return cb(err)
        arr = stdout
          ? Object.keys(JSON.parse(stdout)?.dependencies)
          : []
        resolve(arr)
        // console.log(1);
      }
    )
  }).then(res => {
    return res
    // arr = res
  })
  // console.log(2);
  // return arr
}

// getInstalledPackages().then(pkg => {
//   console.log('PACKAGES >>>', pkg);
// })

// console.log('PACKAGES');
// console.log('>>>', getInstalledPackages());

exports.getInstalledPackages = getInstalledPackages