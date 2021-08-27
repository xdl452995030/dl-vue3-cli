#!/usr/bin/env node

const program = require("commander")
const shell=require("shelljs")
const download = require("git-clone")
const open = require("open")
const {spawn}=require("child_process")

program.version("1.0.0")
program.command("new <name>")
.description("创建项目")
.action(name=>{
    let giturl = "git@github.com:vuejs/vue-next-webpack-preview.git"
    download(giturl,`./${name}`,()=>{
        shell.rm('-rf',`${name}/.git`)
        shell.cd(name)
        shell.exec("cnpm i")

       console.log(`
       创建${name}成功
       cd ${name} 进入项目
       mycli run ${name} 启动项目
       mycli start 预览项目
       `)


    })

    console.log(`创建项目${name}成功`)
})

program.command("run")
.description("运行项目")
.action(name=>{
    // console.log(`运行项目`)
    // shell.exec("cnpm run dev")
    let cp = spawn("npm",['run','dev'])
    cp.stdout.pipe(process.stdout)
    cp.stderr.pipe(process.stderr)
    cp.on("close",()=>{
        console.log("启动项目成功")
    })


})

program.command("start")
.description("预览项目目")
.action(name=>{
    open("http://localhost:8080/")

    console.log(`预览项目`)
})






program.parse(process.argv)







// console.log("hello")