window.onload = function () {
    var telReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    var App = new Vue({
        el: '#app',
        data () {
            return {
                workInfos: {
                    name: '',
                    tel: '',
                    address: '',
                    company: '',

                    // 征文活动的
                    workName: '',
                    workContent: '',
                    workPhotos: [],

                    // 照片活动
                    workDesc: '',

                    // 短视频
                    workVideo: '',

                },

                maxPhotoCount: 3,
                workType: 1, // 1 征文 2 照片 3 短视频

                imgCode: '',
                imgCodeUrl: 'http://39.98.40.64:9902/site/captcha?_' + Date.now(),
                qiniuToken: '',
                successVisiable: false
            }
        },
        created () {
            this.getImgCodeUrl()
            this.getQiniuToken()
        },
        methods: {
            handleClick (tabIndex) {
                this.workType = tabIndex
                if (tabIndex == 1) {
                    this.maxPhotoCount = 3
                } else {
                    this.maxPhotoCount = 5
                }
            },

            handleDelete (index) {
                this.workInfos.workPhotos.splice(index, 1)
            },

            handleUpload (el, type) {
                var file = el.target.files[0]
                console.log(file)
                const key = 'shierda/' + Math.ceil(Math.random() * 100000) + file.name;
                const putExtra = {
                    fname: '',
                    params: {},
                    mimeType: ['image/png', 'image/jpeg', 'image/gif'],
                };
                const config = {
                    useCdnDomain: true, //使用cdn加速
                };
                const observable = qiniu.upload(file, key, this.qiniuToken, putExtra, config);

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
                            this.workInfos.workVideo = 'http://tv.xingafrica.com/' + res.key
                        } else {
                            this.workInfos.workPhotos.push('http://tv.xingafrica.com/' + res.key)
                        }
                    },
                });
            },

            handleJoin () {
                var _self = this
                // 校验数据
                var vaildInfo = this.validate()
                if (!vaildInfo.valid) {
                    window.$util.toast({ title: vaildInfo.msg })
                    return
                }

                $.ajax({
                    url: 'http://39.98.40.64:9902/site/submit-content',
                    data: {
                        name: this.workInfos.name,
                        phone: this.workInfos.tel,
                        address: this.workInfos.address,
                        work_place: this.workInfos.company,
                        type: this.workType,
                        works_name: this.workInfos.workName,
                        works_content: this.workInfos.workContent,
                        works_imgs: JSON.stringify(this.workInfos.workPhotos),
                        works_video: this.workInfos.workVideo,
                        works_description: this.workInfos.workDesc,
                        verifyCode: this.imgCode,
                    },
                    dataType: 'json',
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (res) {
                        try {
                            let _res
                            if (typeof res === 'string') {
                                _res = JSON.parse(res)
                            } else {
                                _res = res
                            }
                            if (_res.code == 200) {
                                _self.successVisiable = true
                            } else {
                                window.$util.toast({ title: _res.message })
                            }
                        } catch (e) {
                            console.error(e)
                        }
    
                    }
                })
            },

            validate () {
                var v = { valid: true, msg: '' }
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
                if (!this.workInfos.address) {
                    v.valid = false
                    v.msg = '请输入联系地址'
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
                } else {
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

            handleImgCodeChange () {
                this.getImgCodeUrl()
            },

            getImgCodeUrl () {
                this.imgCodeUrl = 'http://39.98.40.64:9902/site/captcha?_' + Date.now()
            },

            getQiniuToken () {
                var _self = this
                $.ajax({
                    url: 'http://39.98.40.64:9902/site/get-key',
                    data: {},
                    dataType: 'json',
                    type: 'get',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (res) {
                        try {
                            let _res
                            if (typeof res === 'string') {
                                _res = JSON.parse(res)
                            } else {
                                _res = res
                            }
                            if (_res.code == 200) {
                                _self.qiniuToken = _res.data
                            }
                        } catch (e) {
                            console.error(e)
                        }
                    }
                })
            },

            handleBack() {
                location.href = '/index.html'
            }
        }
    })
}