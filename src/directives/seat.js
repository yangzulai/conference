import utils from '../services/utils';

var screenHeight = document.body.clientHeight;
var screenWidth = document.body.clientWidth;

// 加入高亮
var addFocus = {
    bind(el, binding, vnode) {
        var currentUser = binding.value ? binding.value.currentUser:{};
        setTimeout(() => {
            var $td = $(el).find("td");
            var hasSeat = false;
            $td.each((index, item)=> {
                var text = $(item).text();//每个座位的文字
                if (currentUser.name && equalMatch(text, currentUser)) {
                    $(item).addClass("isActive");
                    hasSeat = true;
                }
            })
            if (currentUser.name && !hasSeat) alert("不在会议名单内，请在其他位置落座");
        }, 0);
    }
}

// 相等匹配
function equalMatch(text, userInfo) {
    return utils.clearSpace(text) == utils.clearSpace(userInfo.name) || utils.clearSpace(text) == (utils.clearSpace(userInfo.name)+userInfo.phone);
}

// 调整table大小
var resizeTable = {
    inserted: (el, binding) => {
        var $table = $(el).find("table");
        var h = $table.outerHeight();
        var ratio = screenWidth / h;
        $table.css({
            "transform": "scale(" + ratio + ")"
        })
    }
}

export default {
    addFocus,
    resizeTable
}