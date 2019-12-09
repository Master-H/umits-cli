'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const yosay = require('yosay')
const ora = require('ora')
module.exports = () => {
 co(function *() {
    // 处理用户输入
  	// let tplName = yield prompt('Template name: ')
  	let projectName = yield prompt('Project name: ')
  	let gitUrl
  	let branch

	// if (!config.tpl[tplName]) {
  //   	console.log(chalk.red('\n × Template does not exit!'))
  //   	process.exit()
  //   }
	// gitUrl = 'https://github.com/Master-H/dvats.git'
	gitUrl = 'git@github.com:Master-H/dvats.git'
	// gitUrl = config.tpl[tplName].url
	branch = 'master'
	// branch = config.tpl[tplName].branch
    // git命令，远程拉取项目并自定义项目名
    // let cmdStr = `git clone --depth=1 ${gitUrl} ${projectName}  && cd ${projectName} `
    let cmdStr = `git clone --depth=1 ${gitUrl} ${projectName}  && cd ${projectName} && git checkout ${branch}`
    // let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`

	// console.log(chalk.white('\n Start generating...'))
	console.log(yosay(chalk.red(`\n 模板下载中 ... \n 模板地址：${gitUrl}`)))
  const spinner = ora(`下载模板，源地址:${gitUrl}`)
  // spinner.start()
	exec(cmdStr, (error) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      exec('cd ' + projectName + ' && rm -rf .git', (err, out) => {
        if(err){
          console.log(err);
          tip.fail('请重新运行!');
          process.exit();
        }
        console.log(chalk.green('\n √  completed!'))
        console.log(chalk.red(`\n cd ${projectName} && npm install \n`))
        console.log(chalk.red(`\n npm start`))
        process.exit()
      });
      // spinner.succeed()
      // console.log(yosay(chalk.red(`\n 下载完成 ... `)))
     
	})
  })
}
