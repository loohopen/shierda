window.onload = function () {
    var App = new Vue({
        el: '#app',
        data() {
            return {
                workInfos: {
                    name: '',
                    tel: '',
                    company: '',

                    // 征文活动的
                    workName: '',
                    workContent: '',
                    workPhotos: [],

                    // 照片活动
                    workDesc: '',

                    // 短视频
                    workVideo: 'http://tv.xingafrica.com/XingAfrica.mp4',

                },

                maxPhotoCount: 6,
                workType: 1, // 1 征文 2 照片 3 短视频

                imgCode: '',
            }
        },
        created() {
            console.log(111)
        },
        methods: {
            handleClick(tabIndex) {
                this.workType = tabIndex
            },

            handleDelete(index) {
                this.workInfos.workPhotos.splice(index, 1)
            },

            handleUpload(el, type) {
                var file = el.target.files[0]
                console.log(file)
                // vFNS3H858is0QqD9H0nGk8s6697Co_60I1gAibun:_DbOrGjvXq5sXUVrW69i5wLdCbs=:eyJzY29wZSI6InhpbmdhZnJpY2EiLCJkZWFkbGluZSI6MTY2MTc4ODIwNX0=
                const key = file.name;
                const token = 'vFNS3H858is0QqD9H0nGk8s6697Co_60I1gAibun:5w4CG3lJXXkoOiWKbg26DqsRYBw=:eyJzY29wZSI6InhpbmdhZnJpY2EiLCJkZWFkbGluZSI6MTY2MTc5MjA0N30='; //从服务器拿的并存在本地data里
                const putExtra = {
                    fname: '',
                    params: {},
                    mimeType: ['image/png', 'image/jpeg', 'image/gif'],
                };
                const config = {
                    useCdnDomain: true, //使用cdn加速
                };
                const observable = qiniu.upload(file, key, token, putExtra, config);

                observable.subscribe({
                    next: (result) => {
                        // 主要用来展示进度
                        console.warn(result);
                    },
                    error: () => {
                        alert('上传图片失败');
                    },
                    complete: (res) => {
                        console.log(res.key);
                        if (type == 2) {
                            this.workInfos.workVideo = `http://tv.xingafrica.com/${res.key}`
                        } else {
                            this.workInfos.workPhotos.push(`http://tv.xingafrica.com/${res.key}`)
                        }
                    },
                });
            },

            handleJoin() {

            }
        }
    })
}