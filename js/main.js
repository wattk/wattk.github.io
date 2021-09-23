const scroll = () => {
    let $movePage = null;
    let moveIndex = 0;
    let $movePageTop = 0;
    let time = false;
    let $wrap = $(".wrap");
    let $nav = $("nav ul li a");

    $("html, body").scrollTop(0);

    $nav.on("click",(e)=>{
        moveIndex = $(e.target).parent("li").index();
        moving(moveIndex);
        return false;
    });

    $("#startBtn").on("click",(e)=>{
        moving(moveIndex);
        return false;
    });

    $wrap.on("wheel",(e)=>{
        if(time == false){
            wheel(e);
        }
    });

    const wheel = (e) =>{
        if(e.originalEvent.deltaY > 0){
            if(moveIndex < 4){
                moving(++moveIndex);
            };
        }
        else if(e.originalEvent.deltaY < 0){
            if(moveIndex > 0){
                moving(--moveIndex);
            };
        }
        else return;
    };

    const moving = (index) =>{
        time = true;
        $movePage = $wrap.children(".page").eq(index);
        $movePageTop = $movePage[0].offsetHeight*(index+1);
        pageEffect(index);
        $("html, body").stop().animate({
            scrollTop : $movePageTop
        }, 1000, function(){time = false;});
    }

    const pageEffect = (index)=>{
        const $intro = $("#intro");
        const $info = $("#info");
        const $likemain = $("#likemain");
        const $projectHeader = $(".projectHeader");
        const $projects = $(".projects");
        const $roadmapHeader = $(".roadmapHeader");
        const $cards = $(".cards");
        const joins = $(".joins");
    
        if(index == 0){
            $intro.addClass("show");
            $info.addClass("show");
        }
        else{
            $intro.removeClass("show");
            $info.removeClass("show");
        }
        if(index == 1){
            $likemain.addClass("show");
        }
        else{
            $likemain.removeClass("show");
        }
        if(index == 2){
            $projectHeader.addClass("show");
            $projects.addClass("show");
        }
        else{
            $projectHeader.removeClass("show");
            $projects.removeClass("show");
        }
        if(index == 3){
            $roadmapHeader.addClass("show");
            $cards.addClass("show");
        }
        else{
            $roadmapHeader.removeClass("show");
            $cards.removeClass("show");
        }
        if(index == 4){
            joins.addClass("show");
        }
        else{
            joins.removeClass("show")
        }
            
    };
}



const particleanima = () => {
    
    let $particles = $(".particles");
    let border = ["50%", "0%"];
    let colors = ["#FF6B6B", "#FFE66D", "#4472CA"];
    
    const getParticles = () => {
        let np = document.documentElement.clientWidth/40;
        $particles.text("");
        for(let i = 0; i< np; i++){
            let w = document.documentElement.clientWidth;
            let h = document.documentElement.clientHeight;
            let rndw = Math.floor(Math.random() * w ) + 1;
            let rndh = Math.floor(Math.random() * h ) + 1;
            let widthpt = Math.floor(Math.random() * 12) + 7;
            let opty = Math.floor(Math.random() * 4) + 1;
            let anima = Math.floor(Math.random() * 12) + 8;
            let bdr = Math.floor(Math.random() * 2);
            let color = Math.floor(Math.random() * 3);
            
            let div = document.createElement("div");
            $(div).css("position","absolute")
            .css("marginLeft", rndw+"px")
            .css("marginTop", rndh+"px")
            .css("width", widthpt+"px")
            .css("height", widthpt+"px")
            .css("opacity", opty)
            .css("backgroundColor", colors[color])
            .css("borderRadius", border[bdr])
            .css("animation", "move "+anima+"s ease-in infinite");
            $particles.append(div);
        };
    };

    getParticles();
};

const printHobbies = () => {
    const $scroller = $("#scroller ol");
    let $height = $("#scroller ol").children().outerHeight();
    let rollingId = setInterval(function(){rollingStart();}, 2000);

    $scroller.mouseover((e) => {
        clearInterval(rollingId);
    });
    $scroller.mouseout((e)=>{
        rollingId = setInterval(function(){rollingStart();},2000);
    });

    const rollingStart = () =>{
        $scroller.animate({top: -$height +"px"},1500,function(){
            $(this).append("<li>"+$(this).find("li:first").html()+"</li>")
            $(this).find("li:first").remove();
            $(this).css("top",0);
        });
    }
};

const viewImg = ()=>{
    $("#linkinfo").on("click",e=>{
        $(".map").fadeIn(1000);
    });
    $(".map").click(e=>{
        $(".map").fadeOut(1000);
    });
};

const viewPjt = () =>{
    const $project = $(".project .img");
    const $modal = $(".modal");
    const $wrap = $(".modal-wrap");
    $project.on("click", e=>{
        $modal.fadeIn(1000);
        for(let i = 0; i < $project.length; i++){
            if($(e.target).parent().is($project.eq(i))){
                $wrap.eq(i).show();
            }
            else{
                $wrap.eq(i).hide();
                console.log("불일치");
            }
        };
    });
    $(".modal>img").on("click", e=>{
        $modal.fadeOut(1000);
        $wrap.fadeOut(1000);
    });
}

const join = () =>{
    let userId = document.getElementById("userId");
    let pwd = document.getElementById("pwd");
    let pwdCheck = document.getElementById("pwdCheck");
    let userName = document.getElementById("userName");
    let email = document.getElementById("email");

    const saveMemberBook=()=>{
        function MemberBookEntry(userId, pwd, userName, email){
            this.userId = userId;
            this.pwd = pwd;
            this.userName = userName;
            this.email = email;
            };
    
        //1. localStorage에 저장
        const member = new MemberBookEntry(userId.value, pwd.value, userName.value, email.value);
        const members = JSON.parse(localStorage.getItem('members'))||[];
        members.push(member);
    
        localStorage.setItem('members',JSON.stringify(members));
    
    
        //3. form 초기화
        document.memberFrm.reset();
    };

    //아이디검사
    let regExp1 = /^[a-z][a-z\d]{3,11}$/;
    let regExp2 = /[0-9]/;
    if(!regExpTest(regExp1
                    ,userId
                    ,"영소문자 입력이 필요합니다."))
        return false;
    if(!regExpTest(regExp2
                    ,userId
                    ,"숫자가 하나 이상 필요합니다."))
        return false;


    //비밀번호 검사
    var regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\*!&]/];

    for(let i = 0; i < regExpArr.length; i++){
        if(!regExpTest(regExpArr[i], pwd, "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해 주세요.")){
            return false;
        }
    }
    
    //비밀번호일치여부
    if(!isEqualPwd(pwdCheck, "비밀번호가 일치하지 않습니다.")){
        return false;
    }

    //이름검사
    let regExp3 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/;
    if(!regExpTest(regExp3,userName,"한글2글자이상 입력하세요."))
        return false;

    //이메일 검사
    if(!regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, email, "이메일 형식에 어긋납니다."))
        return false;
        saveMemberBook();

    function isEqualPwd(el, msg){
        if(pwd.value == el.value){
            $(el).next().remove();
            return true;
        }
        else{
            $(el).next().remove();
            $span = $("<span></span>")
            $span.insertAfter($(el))
                .text(msg);
            return false;
        }
    }

    function regExpTest(regExp, el, msg){
        if(regExp.test(el.value)){
            $(el).next().remove();
            return true;
        }
        //적합한 문자열이 아닌 경우
        $(el).next().remove();
        $span = $("<span></span>");
        $span.insertAfter($(el))
            .text(msg);
        return false;
    };

}

const login = () =>{
    const loginId = document.getElementById("loginId");
    const loginPwd = document.getElementById("loginPwd");
    const members = JSON.parse(localStorage.getItem('members')) || [];
    console.log(members);
        for(let i = 0; i < members.length; i++){
            if(members[i].userId == loginId.value && members[i].pwd == loginPwd.value){
                alert("로그인되었습니다");
                return true;
            }
            else{
                alert("유효한 비밀번호가 아닙니다");
            }
        };
        return false;
}

$(document).ready(()=>{
    scroll();
    particleanima();
    printHobbies();
    viewPjt();
    viewImg();
});