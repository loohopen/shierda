window.onload = function () {
    var telReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
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
                imgCodeUrl: ''
            }
        },
        created() {
            this.getImgCodeUrl()
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
                // 校验数据
                var vaildInfo = this.validate()
                if (!vaildInfo.valid) {
                    window.$util.toast({title: vaildInfo.msg})
                    return
                } 
            },

            validate() {
                var v = { valid: true, msg: ''}
                if (!this.workInfos.name) {
                    v.valid = false
                    v.msg = '请输入姓名'
                    return v
                }
                if (!telReg.test(this.workInfos.tel)) {
                    v.valid = false
                    v.msg = '请输入正确的手机号'
                    return v
                }
                if (!this.workInfos.company) {
                    v.valid = false
                    v.msg = '请输入所属单位'
                    return v
                }
                if (this.workType === 1) {
                    if (!this.workInfos.workName) {
                        v.valid = false
                        v.msg = '请输入作品名称'
                        return v
                    }
                    var _t = this.workInfos.workContent.replace(/\s+/g, '')
                    if (!_t || this.workInfos.workContent.length > 2000) {
                        v.valid = false
                        v.msg = '作品内容必填且不超过2000字'
                        return v
                    }
                    if (!this.workInfos.workPhotos.length) {
                        v.valid = false
                        v.msg = '请至少上传一张配图'
                        return v
                    }
                } else if (this.workType === 2) {
                    if (!this.workInfos.workPhotos.length) {
                        v.valid = false
                        v.msg = '请至少上传一张配图'
                        return v
                    }

                    var _t = this.workInfos.workDesc.replace(/\s+/g, '')
                    if (!_t || this.workInfos.workDesc.length > 200) {
                        v.valid = false
                        v.msg = '作品介绍必填且不超过200字'
                        return v
                    }
                }else {
                    if (!this.workInfos.workVideo) {
                        v.valid = false
                        v.msg = '请上传短视频作品'
                        return v
                    }
                    var _t = this.workInfos.workDesc.replace(/\s+/g, '')
                    if (!_t || this.workInfos.workDesc.length > 200) {
                        v.valid = false
                        v.msg = '作品介绍必填且不超过200字'
                        return v
                    }
                }
                if (!this.imgCode) {
                    v.valid = false
                    v.msg = '请输入图形验证码'
                    return v
                }
                return v
            },

            getImgCodeUrl() {
               window.$http.get('/d', '', function() {
                   console.log(11)
               })
            }
        }
    })
}