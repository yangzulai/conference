<template>
    <div class="seat-table" v-if="content.length" v-html="content" v-seat-focus="{currentUser:userInfo}" v-resize-table></div>
</template>

<script>
    export default {
        data() {
            return {
                // userInfo: window.$eventBus.userInfo
                userInfo: {
                    
                }
            }
        },
        props: {
            content: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style lang="less">
    @import '../../assets/seat/table.less';
</style>