<template>
    <div class="previewmask" v-show="isShow">
        <div id="preview">
            <div class="closebtn" @click="hiddenPreview"></div>
            <div class="preview_body">
                <div class="preview_title">
                    <p>{{titile}}</p>
                </div>
                <div class="preview_html" v-show="showHtml">
                    <div v-html="valHtml">{{valHtml}}</div>
                </div>
                <div class="preview_iframe" v-show="showIframe">
                    <iframe ref="preview" class="previewbox" :src="urlIframe" width="257" :height="iframeHeight" frameborder="0" name="iframe" scrolling="no"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
            isShow:false,
            showHtml:false,
            showIframe:false,
            valHtml:'',
            urlIframe:'',
            iframeHeight:'414',
            titile:'',
      }
    },
    props:["previewContent","appTitile"],
    methods:{
        showPreview(){
            this.$nextTick(()=>{
                console.dir(this.$refs.preview)
                this.$refs.preview.onload=()=>{
                    var iframeHeight = this.$refs.preview.contentWindow.document.body.scrollHeight;
                    if(iframeHeight>this.iframeHeight){
                        this.iframeHeight = iframeHeight;
                    }
                }
                this.getData();
            })
        },
        getData(){
            this.titile = this.appTitile;
            if(this.previewContent.startsWith('http')){
                this.urlIframe = this.previewContent;
                this.showHtml = false;
                this.showIframe = true;
            }else{
                this.valHtml = this.previewContent;
                this.showHtml = true;
                this.showIframe = false;
            }
            this.isShow = true;
        },
        hiddenPreview(){
            this.isShow = false;
        },
    }
  }
</script>
<style lang="less" scoped>
    .previewmask{
        z-index: 2019;
        position:fixed;
        left:0px;
        top:0px;
        width: 100%;
        height:100%;
        background:rgba(243, 243, 243,0.3);
        overflow: hidden;
    }
    .previewbox {
        body::-webkit-scrollbar {
            width: 0;
        }
    }
    #preview{
        position:absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        width:257px;
        height:457px;
        padding:10px 9px 35px 9px;
        background:url('../../assets/previewComponent1.png');
        background-position:-16px -11px;
        border-radius: 26px;
        box-shadow:0px 5px 20px 0px rgba(12,56,121,0.2);
        position:relative;
        .closebtn{
            border-radius:50%;
            width: 30px;
            height:30px;
            position:absolute;
            left:122.5px;
            bottom:11px;
            background:url('../../assets/previewComponent2.png');
            background-position:-17px -9px;
            cursor: pointer;
        }
        .preview_body{
            box-shadow:0px 0px 6px 0px rgba(0,37,89,0.15) inset;
            border-radius:13px;
            background:#fff;
            height:100%;
            width: 100%;
            .preview_title{
                p{
                    font-size:12px;
                    color:#fff;
                    text-align: center;
                    padding-top:18px;
                    opacity: 0.8;
                }
                height:43px;
                border-radius: 13px 13px 0px 0px;
                background: url('../../assets/previewComponent3.png') no-repeat;
            }
            overflow: auto;
            .preview_iframe{
                height:100%;
            }
            &::-webkit-scrollbar{
                width: 0px;
            }
            &::-webkit-scrollbar-track{
                background-color:transparent;
            }
            &::-webkit-scrollbar-thumb{
                background-color:transparent;
            }
        }
    }
</style>
