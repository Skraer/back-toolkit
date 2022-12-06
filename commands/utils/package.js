const getInstalledPackages = () => {
  // let arr = []
  // return new Promise((resolve) => {
  const result = require('child_process').execSync(
    'npm ls --json',
    // function (err, stdout, stderr) {
    //   if (err) return cb(err)
    //   arr = stdout
    //     ? Object.keys(JSON.parse(stdout)?.dependencies)
    //     : []

    // resolve(arr)
    // console.log(1);
    // }
  )
  const arr = result
    ? Object.keys(JSON.parse(result)?.dependencies)
    : []

  return arr
  // console.log('parsed', JSON.parse(result));
  // return arr
  // }).then(res => {
  //   return res
  // arr = res
  // })
  // console.log(2);
  // return arr
}

// getInstalledPackages()
// console.log(getInstalledPackages());
// getInstalledPackages().then(pkg => {
//   console.log('PACKAGES >>>', pkg);
// })

// console.log('PACKAGES');
// console.log('>>>', getInstalledPackages());

exports.getInstalledPackages = getInstalledPackages