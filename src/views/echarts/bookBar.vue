<template>
    <div class="bar" id="bar">
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
        }
    },
    computed: {},
    created() { },
    mounted() {
        this.initEcharts()
    },
    methods: {
        initEcharts() {
            var mycharts = this.$echarts.init(document.getElementById('bar'))
            var option = {
                title:{
                    text:'图书分类统计',
                    textStyle:{
                        color:'#2c3e50'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['工具书', '小说', '散文', '诗集', '随笔', '文艺', '通古'],
                    axisLabel:{
                        color:'#2c3e50',
                        fontSize:13
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar', 
                        itemStyle:{
                            color:'#2980b9'
                        }
                    },
                ]
            };
            mycharts.setOption(option)
            window.addEventListener('resize', function(){
                mycharts.resize()
            })
        }
    }
}
</script>

<style scoped>
.bar {
    height: 100%;
    width: 100%;
}
</style>
