const getInstalledPackages = () => {
  let arr = []
  require('child_process').exec(
    'npm ls --json',
    function (err, stdout, stderr) {
      if (err) return cb(err)
      arr = stdout
        ? Object.keys(JSON.parse(stdout)?.dependencies)
        : []
    }
  )
  return arr
}

exports.getInstalledPackages = getInstalledPackages