<template>
     <div class="cover" ref="cover" v-if="pop">
        <div class="missage-box">
            <div class="p-box">
                <p class="p1">
                  提示
                </p>
                <p class="tips">
                  确定删除该信息么？
                </p>
            </div>
            <div class="check-box">
              <a class="cancelButton" ref="cancel"  @click="cancelDelete()">取消</a>
            <a class="confirmButton" ref="cancel" @click="confirmDelete()">确定</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped lang="less">
  .cover {
          width: 100%;
          height: 100%;
          position: fixed;
          left: 0;
          top: 0;
          background: rgba(102, 102, 102, 0.5);
          .missage-box {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              -ms-transform: translate(-50%,-50%); 	/* IE 9 */
              -moz-transform: translate(-50%,-50%); 	/* Firefox */
              -webkit-transform: translate(-50%,-50%); /* Safari 和 Chrome */
              -o-transform: translate(-50%,-50%); 	/* Opera */
              border-radius: 0.2rem;
              background: #fff;
              width: 5.4rem;
              height: 3.35rem;
              overflow: scroll;
              .p-box {
                    padding: 0.57rem 0.3rem 0.5rem .3rem;
                     .p1 {
                        color: #404040;
                        font-family: PingFang-SC-Medium;
                        font-size: 0.36rem;
                        text-align: center;
                      }
                     .tips{
                        font-family: PingFang-SC-Medium;
                        color: #6f6f6f;
                        font-size: 0.3rem;
                        padding-top: 0.15rem;
                      }
                  }
                    .check-box {
                      display: flex;
                      justify-content:center;
                      font-size: 0.34rem;
                      font-family: PingFang-SC-Medium;
                       .cancelButton{
                          display: block;
                          width: 2.20rem;
                          height: 0.8rem;
                          line-height: 0.8rem;
                          background-color: rgba(0, 0, 0, 0.1);
                          color: #404040;
                          border-radius: 0.09rem;
                          margin-right: 0.4rem;
                          text-align: center;

                       }
                       .confirmButton{
                          display: block;
                          width: 2.20rem;
                          height: 0.8rem;
                          line-height: 0.8rem;
                          background-color: #fed953;
                          color: #404040;
	                        border-radius: 0.09rem;
                          text-align: center;

                       }
                    }

            }
        }
</style>


