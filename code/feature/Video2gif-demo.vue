<template>
	<view class="to-gif-warp">
		<view v-if="!uploadedVideoPath" class="add-video"><cover-image class="video-img" src="/static/grid/add-video.png" @click="uploadVideo"></cover-image></view>
		<video
			v-else
			id="video-play"
			:show-center-play-btn="false" 
			:src="uploadedVideoPath"
			@pause="onPause"
			@ended="ended"
			@play="drawNative"
			:controls="false"
			:muted="true"
			:initial-time="0"
			:show-play-btn="false"
		></video>
		<view class="quality-wrap">
			<view class="text">视频截取质量</view>
			<uni-data-checkbox v-model="qualityVal" mode="button" :localdata="qualityData" @change="onQualityChange"></uni-data-checkbox>
		</view>
		<view class="operation-wrap">
			<uni-icons v-if="!customEdit" @click="customEditImgs" custom-prefix="iconfont" type="icon-edit" color="#fff" size="30"></uni-icons>
			<uni-icons v-else @click="cancelCustomEdit" type="undo-filled" color="#e43d33" size="30"></uni-icons>
			
			<!-- 未开始转换 -->
			<uni-icons v-if="playing || converting" class="start-btn" custom-prefix="iconfont"  @click="handleStop"  type="icon-pause" color="#fff" size="45"></uni-icons>
			<uni-icons v-else class="start-btn" @click="start" custom-prefix="iconfont" type="icon-start" color="#fff" size="45"></uni-icons>
			<uni-icons @click="delVideo" type="trash" color="#e43d33" size="30"></uni-icons>
		</view>
		<view class="img-list-wrap" v-if="customEdit && imgFiles.length">
			<view class="rang-text">{{ rangeVal[0] }} - {{ rangeVal[1] }}</view>
			<view class="imgs-view">
				<view class="preview-img" v-for="(imgPath, index) in imgFiles" :key="index">
					<cover-image :src="imgPath" @click="selectPreviewImg(imgPath, index)"></cover-image>
				</view>
			</view>
		</view>
		<progress v-show="uploadedVideoPath" :percent="progress" style="color: #fff;" activeColor="#10AEFF" backgroundColor="rgba(255,255,255,0.2)" :border-radius="3" :show-info="true"></progress>
		<view class="gif-wrap">
			<cover-image class="gif-cover-img" v-show="gifOutUrl" :src="gifOutUrl" :style="{width: cvsWidth, height: cvsHeight}"></cover-image>
			<canvas v-show="!gifOutUrl" id="cas-item" type="2d" :style="{width: cvsWidth, height: cvsHeight}"></canvas>
		</view>
		<ad unit-id="__UNI__2A00097"></ad>
		<view class="save-btn-wrap">
			<button class="save-local" @click="exoprtGif">保存到相册</button>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { getUserInfo, getVideoContext, getCanvasNode, clearCvs, getElNode } from '../../utils/uni-utils.js';
import uniDataCheckbox from '@/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox';
import gifshot from 'gifshotjs-miniprogram';

export default {
	components: {
		uniDataCheckbox
	},
	data() {
		return {
			uploadedVideoPath: '',
			videoInfo: { width: 414, height: 225 },
			timer: null,
			progressTimer: null,
			imgFiles: [],
			imgFilesSave: [],
			selectedImgs: [],
			startTime: 0,
			progress: 0,
			printInfo: {
				msg: ''
			},
			imgNameDate: '',
			gifOutUrl: '', // gif 导出路径
			baseTmpDirName: `${wx.env.USER_DATA_PATH}/imgDir`,
			customEdit: false,
			qualityVal: 0.1,
			gifInterval: 0.08,
			qualityData: [{ value: 0.1, text: '低', interval: 0.08 }, { value: 0.3, text: '中', interval: 0.08 }, { value: 0.5, text: '高', interval: 0.08 }],
			playing: false ,// 是否播放中
			converting: false,
			cvsWidth: '100%',
			cvsHeight: '500rpx',
			sysInfo: {},
			cvsStyle: {
				height: '500rpx',
				width: '100%',
			},
			imgActiveIndex: [],
		};
	},
	computed: {
		...mapGetters({
			hasLogin: 'user/hasLogin'
		}),
		rangeVal() {
			return [0, this.imgFiles.length];
		}
	},
	onLoad() {
		this.init();
	},

	methods: {
		
		delVideo() {
			this.uploadedVideoPath = '';
			this.customEdit = false;
			this.playing = false;
			this.clear();
		},
		// 创建文件夹
		createDir() {
			const fs = wx.getFileSystemManager();
			try {
				fs.mkdirSync(this.baseTmpDirName, false);
			} catch (e) {
				console.error(e);
			}
		},
		// 检测文件夹是否存在
		checkDir() {
			const fs = wx.getFileSystemManager();
			return new Promise((resolve, reject) => {
				fs.stat({
					path: this.baseTmpDirName,
					success: res => {
						console.log(res.stats.isDirectory());
						resolve(res.stats.isDirectory());
					},
					fail: err => {
						console.log(err);
						resolve(false);
					}
				});
			});
		},
		dirStat() {
			const fs = wx.getFileSystemManager();
			fs.stat({
				path: this.baseTmpDirName,
				recursive: true,
				success: res => {
					Object.keys(res.stats).forEach(path => {
						let stats = res.stats[path];
						console.log('sats:', path, stats);
					});
				}
			});
		},
		clear() {
			clearCvs('cas-item', this);
			this.rmOldGif()
			this.imgFiles = [];
			this.imgActiveIndex = []
			this.progress = 0;
			this.converting = false
			const fs = wx.getFileSystemManager();
			
			fs.rmdir({
				dirPath: this.baseTmpDirName,
				recursive: true,
				success(res) {
					console.log('缓存已清除：', res);
					uni.hideLoading();
				},
				fail(res) {
					console.error(res);
					uni.hideLoading();
				}
			});
		},
		onQualityChange(e) {
			const {value, interval} =  e.detail.data
			this.qualityVal = value;
			this.gifInterval = interval
		},
		init() {
			const sysInfo = uni.getSystemInfoSync();
			console.log(sysInfo.screenWidth)
			this.sysInfo = sysInfo
			
		},
		// wx api 获取节点
		async drawNative() {
			
			const { width, height, duration } = this.videoInfo;
			if(duration > 5) {
				uni.showModal({
					title: '提示',
					content: '视频时长需小于5s!',
					showCancel: true,
					success: () => {
						this.delVideo()
					},
					fail: () => {
						console.log('取消...');
					}
				})
				return
			}
			const videoRes = await getVideoContext('video-play', this);
			const video = videoRes[0].context;
			const canvasRes = await getCanvasNode('cas-item', this);
			const canvas = canvasRes[0].node;
			const ctx = canvas.getContext('2d');
			console.log('width:', width, height, canvas.width, canvas.height);
			this.playing = true
			this.imgFiles = [];
			this.progress = 0;
			let computedLen = 80;
			if (duration < 1) {
				computedLen = 1;
			} else {
				computedLen = Math.ceil((duration * 1000) / 100); // 50 100 150 200
			}
			this.imgNameDate = Date.now();
			uni.showLoading({title: '转换开始...'})
			this.timer = setInterval(async () => {
				console.log('computedLen：', computedLen);
				// 微信开发工具里canvas不会动，但是真机可以
				if (computedLen < 1) {
					clearInterval(this.timer);
					this.genGifShot(canvas, width, height, computedLen > 5 ? 2 : 0); // 舍弃前两张，可能会会黑图
					return;
				}
				ctx.drawImage(video, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
				const imgData = canvas.toDataURL('image/jpeg', this.qualityVal);
				computedLen >= 1 && this.genImg(imgData, this.imgNameDate, computedLen);
				computedLen--;
			}, 100);
		},
		rmOldGif(){
			const fs = wx.getFileSystemManager();
			// 删除之前生成的GIF
			return new Promise((resolve, reject) => {
				fs.unlink({
						filePath: this.gifOutUrl,
						success: res => {
							this.gifOutUrl = ''
							resolve(true)
						},
						fail(err) {
							uni.showToast({
								title: '删除失败!',
								icon: 'error'
							});
							reject(err)
						}
					});
			})
			
		},
		async genGifShot(cvs, gifWidth, gifHeight, start = 0) {
			if (this.gifOutUrl) {
				const rmRes = await this.rmOldGif()
			}
			uni.showLoading({title: '转换中...'})
			this.converting = true
			this.progressTimer = setInterval(() => {
				let addCount = 5;
				if (this.progress > 50) addCount = 2;
				if (this.progress > 70) addCount = 1;
				if (this.progress > 95) addCount = 0;
				this.progress += addCount;
			}, 1000);
			const images = this.imgFiles.slice(start)
			gifshot.createGIF(
				{
					canvas: cvs /*miniprogram canavs instance*/,
					interval: this.gifInterval,
					gifWidth /*destGifWidth*/,
					gifHeight /*destGifHeight*/,
					images /*an array contains imageData Object*/,
					frameDuration: 0.08 /*gif frame interval*/,
					numWorkers: 1 /*weixin miniprogram must be 1*/
				},
				async obj => {
					console.log(obj);
					// {error: false, errorCode: "", errorMsg: "", image: "base64 string"}
					if (obj.error) {
						return;
					}
					console.log('gif base64 completed');
					const gifPath = await this.genImg(obj.image, this.imgNameDate, 'out', true);
					this.progress = 100;
					this.converting = false
					uni.hideLoading({title: '完成'})
					clearInterval(this.progressTimer);
				}
			);
		},

		// 在缓存创建图片
		async genImg(imgData, name, count, loading) {
			const hasImgDir = await this.checkDir();
			if (!hasImgDir) {
				this.createDir();
			}
			loading && uni.showLoading();
			const fm = wx.getFileSystemManager();
			let filePath = `${this.baseTmpDirName}/${name}_${count}.jpeg`;
			if (count === 'out') {
				filePath = `${this.baseTmpDirName}/${name}_${count}.gif`;
			}
			return new Promise((resolve, reject) => {
				fm.writeFile({
					filePath,
					encoding: 'base64',
					data: imgData.split(',')[1],
					success: r => {
						console.log('image finished writeFile:', r);
						if (count === 'out') {
							this.gifOutUrl = filePath; // 最终导出图片的路径
						} else {
							this.imgFiles.push(filePath); // 临时图片
						}
						resolve(filePath);
						loading &&
							uni.showToast({
								title: '合成GIF成功'
							});
					},
					fail: err => {
						console.log('genImg:', err);
						reject(err);
					}
				});
			});
		},
		async start(){
			// 编辑状态或已有视频截图生成时直接进入转换
			if (this.customEdit || this.imgFiles.length) {
				const canvasRes = await getCanvasNode('cas-item', this);
				const canvas = canvasRes[0].node;
				const { width, height } = this.videoInfo;
				console.log('直接转图片')
				this.genGifShot(canvas, width, height)
			} else {
				console.log('截取视频后再转gif')
				this.playThenConvert()
			}
		},
		// 播放视频,然后转换GIF
		async playThenConvert() {
			if (this.uploadedVideoPath) {
				if (this.imgFiles.length) this.clear()
				const videoRes = await getVideoContext('video-play', this);
				const video = videoRes[0].context;
				video.play();
			} else {
				uni.showModal({
					content: '请上传'
				});
			}
		},
		handleStop(){
			if (this.converting){
				uni.showToast({
					title: '正在转换，请稍后再试！',
				})	
				}
			},
		ended() {
			console.log('video stop!!');
			this.playing = false
			const saveUrl = this.uploadedVideoPath
			this.uploadedVideoPath = ''
			setTimeout(() => {
				this.uploadedVideoPath = saveUrl
			}, 100)
			
			// clearInterval(this.timer);
		},
		onPause() {
			// clearInterval(this.timer);
		},
		// 选择视频文件
		selectVideo(userInfo) {
			const that = this;
			return new Promise((resolve, reject) => {
				uni.chooseMedia({
					count: 1,
					mediaType: ['video'],
					sourceType: ['album', 'camera'],
					maxDuration: 10,
					camera: 'back',
					async success(res) {
						const { tempFilePath, size } = res.tempFiles[0];
						const ext = tempFilePath.split('.').pop();
						uni.getVideoInfo({
							src: tempFilePath,
							success: res => {
								that.videoInfo = res;
								const {width, height} = res
								console.log(width / height)
								if (height > width) {
									that.cvsHeight = 500 + 'rpx'
									that.cvsWidth = 500 * (width / height) + 'rpx'
								} else {
									that.cvsHeight = that.sysInfo.screenWidth * (height/ width) + 'rpx'
									that.cvsWidth = that.sysInfo.screenWidth + 'rpx'
								}
							},
							fail(err) {
								console.log('file:', err);
							}
						});
						const file = {
							filePath: tempFilePath
							// cloudPath: `${Date.now()}_${userInfo._id}.${ext}`,
							// ext
						};
						resolve(file);
					},
					fail(err) {
						reject(err);
					}
				});
			});
		},
		async uploadVideo() {
			try {
				const userInfo = await uni.getStorageSync('userInfo');
				if (!userInfo) {
					uni.showModal({
						content: '未登录'
					});
					return;
				}
				if (this.uploadedVideoPath) {
					this.delVideo();
				}
				const file = await this.selectVideo();
				this.uploadedVideoPath = file.filePath;
			} catch (err) {
				uni.showModal({
					content: '上传失败',
					showCancel: false
				});
			}
		},

		// 保存图片到相册
		exoprtGif() {
			if (!this.gifOutUrl) {
				uni.showToast({
					title: 'GIF还未生成',
					icon: 'error'
				})
				return
			}
			uni.saveImageToPhotosAlbum({
				filePath: this.gifOutUrl,
				success: resq => {
					uni.hideLoading({});
					uni.showToast({
						title: '下载GIF成功',
						icon: 'success'
					});
				},
				fail: resq => {
					console.log(resq);
					uni.hideLoading();
					uni.showToast({
						title: '下载失败',
						icon: 'error'
					});
				}
			});
		},
		exportPng() {
			console.log(this.imgFiles);
			uni.saveImageToPhotosAlbum({
				filePath: this.imgFiles[0],
				success: resq => {
					uni.hideLoading({});
					uni.showToast({
						title: '下载成功',
						icon: 'success'
					});
				},
				fail: resq => {
					console.log(resq);
					uni.hideLoading();
					uni.showToast({
						title: '下载失败',
						icon: 'error'
					});
				}
			});
		},
		// 取消编辑
		cancelCustomEdit() {
			uni.showModal({
				title: '提示',
				content: '确认取消编辑？',
				showCancel: true,
				success: modalRes => {
					if (modalRes.cancel) return;
					debugger
					this.imgFiles = this.imgFilesSave.slice()
					this.imgFilesSave = []
					this.customEdit = false
				},
				fail: () => {
					console.log('取消...');
				}
			});
		},
		// 自定义编辑合成的图片
		customEditImgs() {
			if (!this.imgFiles.length) {
				uni.showToast({
					title: '没有编辑的素材，请先进行一次转换',
					icon: 'error'
				});
				return
			}
			if (this.playing || this.converting) {
				uni.showToast({
					title: '正在转换中，请稍后操作',
					icon: 'error'
				});
				return
			}
			uni.showModal({
				title: '确认自定义编辑？',
				content: '当前生成的gif将被删除，建议先保存到本地',
				showCancel: true,
				success: modalRes => {
					if (modalRes.cancel) return;
					this.imgFilesSave = this.imgFiles.slice() // 备份一份， 编辑到一半撤销时用于恢复
					this.customEdit = true;
					this.rmOldGif()
				},
				fail: () => {
					console.log('取消...');
				}
			});
		},
		selectPreviewImg(imgPath, index) {
			const fs = wx.getFileSystemManager();
			uni.showModal({
				title: '删除该图',
				content: '删除后将不会被合成到GIF中！',
				showCancel: true,
				success: modalRes => {
					if (modalRes.cancel) return;
					this.imgFiles.splice(index, 1)
					// fs.unlink({
					// 	filePath: imgPath,
					// 	success: res => {
					// 		this.imgFiles.splice(index, 1);
					// 		uni.showToast({
					// 			title: '删除成功',
					// 			icon: 'success'
					// 		});
					// 	},
					// 	fail(res) {}
					// });
				},
				fail: () => {
					console.log('取消...');
				}
			});
		}
	}
};
</script>

<style lang="less">
/* #ifndef APP-NVUE */
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #000;
	min-height: 100%;
	height: auto;
}
view {
	font-size: 14px;
	line-height: inherit;
}
/* #endif */
.to-gif-warp {
	.gif-wrap {
		margin-top: 20upx;
		height: 500upx;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.cas-item-style {
		height: 500upx;
		width: 100%;
	}
	// #cas-item {
	// 	height: 500upx;
	// 	width: 100%;
	// }
	#video-play {
		width: 100%;
	}
	
	.img-list-wrap {
		.imgs-view {
			display: flex;
			overflow: scroll;
			.preview-img {
				flex: 0 0 120upx;
				height: 120upx;
				object-fit: contain;
			}
		}
		.rang-text {
			color: #fff;
		}
	}
	.quality-wrap {
		display: flex;
		color: #fff;
		align-items: center;
		justify-content: space-around;
	}
	.operation-wrap {
		color: #fff;
		margin-top: 10rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.start-btn {
			color: #fff;
		}
		.del-btn {
			color: #fff;
		}
	}
	.add-video {
		border-radius: 30upx;
		width: 100%;
		height: 400upx;
		background-image: linear-gradient(-225deg, #ff057c 0%, #7c64d5 48%, #4cc3ff 100%);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.save-local{
		background-color: #7c64d5;
		color: #fff;
		// width: 220upx;
		// height: 80upx;
	}
	.video-img {
		display: block;
		margin: 0 auto;
		width: 120upx;
		height: 120upx;
	}
	.warp {
		padding: 20upx;
	}
}
/* #ifdef APP-NVUE */
/* #endif */
</style>
