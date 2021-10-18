const $siteList=$('.siteList')
const $lastList=$('.lastList')
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)
const hashMap=xObject||[
    {logo:'A',url:'http://www.acfun.cn'},
    {logo:'B',url:'https://www.bilibili.com'}
]
const simplifyUrl=(url)=>{
    return url.replace('http://','')
    .replace('https://','')
    .replace('www.','')
    .replace(/\/.*/,'')
}
const render=()=>{
    $siteList.find('li:not(.lastList)').remove()
    hashMap.forEach((node,index)=>{
        const $li=$(`
        <li>
            <div class="site">
              <div class="logo">
                ${node.logo}
              </div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-closefill"></use>
              </svg>
              </div>
            </div>
        </li>   
        `).insertBefore($lastList)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()  //组织冒泡
            console.log(hashMap)
            hashMap.splice(index,1)
            render()
        })
    })
}
render()
$('.addButton').on('click',()=>{
    let url=window.prompt('请输入你要添加的网址')
    if(url.indexOf('http')!==0){
        url='https://'+url
    }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url
    })
    render()
})
window.onbeforeunload=()=>{
    const string=JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}
$(document).on('keypress',(e)=>{
    const key = e.key
    if(e.target!==document.querySelector('#input')){
        for(let i=0;i<hashMap.length;i++){
            if(hashMap[i].logo.toLowerCase()===key){
                window.open(hashMap[i].url)
            }
        }
    }
    
})
$('#input').on('')