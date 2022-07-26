<template>
    <div class="pie" id="pie">
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
            var mycharts = this.$echarts.init(document.getElementById('pie'))
            var option = {
                title:{
                    text:'热门图书排行榜',
                    textStyle:{
                        color:'#2c3e50'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '详情',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: '时间简史' },
                            { value: 735, name: '复活' },
                            { value: 580, name: '活着' },
                            { value: 484, name: '骆驼祥子' },
                            { value: 300, name: '孙子兵法' }
                        ]
                    }
                ]
            };
            mycharts.setOption(option)
            window.addEventListener('resize',function(){
                mycharts.resize()
            })
        }
    }
}
</script>

<style scoped>
.pie{
    width: 100%;
    height: 100%;
}
</style>
