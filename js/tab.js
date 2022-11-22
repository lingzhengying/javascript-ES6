let that;
class Tab{
    constructor(id){
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        // section的父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init(){
        this.updateNode();
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab.bind(this.add,this);
        for(let i = 0; i < this.lis.length; i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i],this);
            this.remove[i].onclick = this.removeTab.bind(this.remove[i],this)
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // 因为我们动态添加元素 需要从新获取对应的元素
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.i');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    // 1.切换功能
    toggleTab(that){
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    clearClass(){
        for(let i = 0;i < this.lis.length; i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2.添加功能
    addTab(that){
        that.clearClass();
        //  1.创建li元素和section元素
        let random = Math.random();
        let li = '<li class="liactive"><span>新选项卡</span> <span class="i">x</span></li>';
        let section = '<section class="conactive">测试 ' + random + '</section>';
        // 2.把这两个元素追加到对应的父元素里面 beforeend 放到父元素内容的里面
        that.ul.insertAdjacentHTML('beforeend',li);
        that.fsection.insertAdjacentHTML('beforeend',section);
        that.init();
    }
    // 3.删除功能
    removeTab(that,e){
        e.stopPropagation();//阻止冒泡 防止触发li 的切换点击事件
        let index = this.parentNode.index;
        // console.log(index);
        // 根据索引号删除对应的li 和section
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 当我们删除的不是选中状态的li 的时候，原来的选择状态li保持不变
        if(document.querySelector('.liactive'))return;
        // 当我们删除了选中状态的这个li的时候，让它的前一个li 处于选定状态
        index--;
        // 手动调用我们的点击事件 不需要鼠标触发
        that.lis[index] && that.lis[index].click();
    }
    // 4.修改功能
    editTab(){
        let str = this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty();
        this.innerHTML = '<input type="text"/>';
        let input = this.children[0];
        input.value = str;
        input.select();//文本框里面的文字处于选定状态
        // d当我们离开文本框就把文本框里面的值给span
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        }
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                // 手动调用表单失去焦点事件 不需要鼠标离开操作
                this.blur();
            }
        }
    }
}
let tab = new Tab('#tab');  