let images = document.createElement("div");
images.id = "images";
images.onclick = unZoom;

let imgs = [];

function validate(question, answer){
    let validated = (document.getElementById(question + '-' + answer).checked) && checkOther(question, answer);
    let message = (validated)?"Bonne réponse! :)":"Mauvaise réponse :(";
    let color = (validated)?"green":"red";
    document.getElementById(question).innerHTML = message; 
    document.getElementById(question).style = "color:" + color + ";";
}

function checkOther(question, answer){
    switch(answer){
        case 'a1':
            return !(document.getElementById(question + '-a2').checked || document.getElementById(question + '-a3').checked);
            break;
        case 'a2':
            return !(document.getElementById(question + '-a1').checked || document.getElementById(question + '-a3').checked);
            break;
        case 'a3':
            return !(document.getElementById(question + '-a2').checked || document.getElementById(question + '-a1').checked);
            break;
    }
}

function setZoom(){
    let page = document.getElementById("pageContent");
    page.appendChild(images);
    smalls = page.getElementsByTagName("img");

    for(let small of smalls){
        let src = small.src;//small.getElementsByTagName('img')[0].src;
        small.setAttribute("onClick", "zoom('" + src + "');" );
        let image = document.createElement("img");
        image.src = src;
        image.style = "display: none;";
        image.onclick = unZoom;
        imgs.push(image);
    }
    let a = document.createElement("a");
    images.appendChild(a);
    for(let image of imgs){
        a.appendChild(image);
    }
    images.style = "display: none";    
}

function unZoom(){
    images.style = "display: none";
    for(let image of imgs){
        image.style = "display: none"
    }
}

function zoom(src){
    images.style = "";
    for(let child of images.children[0].children){
        const base = 99;
        const outer = (100 - base)/2;
        if(child.src == src){
            let style = "height:"+ base + "vh; top:" + outer + "vh;";
            child.style = style;
            let childWidth = child.clientWidth;
            let windowWidth = window.innerWidth;

            if(childWidth < windowWidth){
                let left = (100 - (childWidth/windowWidth) * 100)/2;
                let width = 100 - 2*left;
                child.style = style + "width: " + width + "%; left: " + left + "%;";
            }
            else{
                style = "width:"+ base + "vw; left:" + outer + "vw;";
                child.style = style;
                let childHeight = child.clientHeight;
                windowHeight = window.innerHeight;
                let top = Math.floor(100 - (childHeight/windowHeight) * 100)/2;
                let height = 100 - 2*top;
                child.style = style + "height: " + height + "%; top: " + top + "%;";
            }
            break;
        }
    }
}