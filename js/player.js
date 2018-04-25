// 播放器可以分为四个结构：背景图（主题），control 组件，正在播放歌曲，下一首/曲目列表
// 1. 给播放器添加功能：播放、暂停、上一首/下一首
// 每当曲目变更时，调用该函数改变当前曲目，下一首和播放器 div 的 data.id
var changSong = function(index) {
    // 载入现在播放标签
    var curName = e('.song-name')
    var curAuthor = e('.artist-name')
    var data = musicList[index]
    curName.innerHTML = data.name
    curAuthor.innerHTML = data.author
    // 载入第一首歌的 url
    var audio = e('#id-audio-player')
    audio.src = data.url
    var audio = e('.audio-control')
    audio.dataset.id = String(data.id)
    // 载入即将播放标签
    var nextName = e('.next-title')
    var nextAuthor = e('.next-author')
    index = (index + 1) % musicList.length
    var data = musicList[index]
    nextName.innerHTML = data.name
    nextAuthor.innerHTML = data.author
}
// 播放功能
var bindPlay = function(audio) {
    // 取得播放按钮
    var playButton = e('.player-controls__btn_play')
    bindEvent(playButton, 'click', function(){
        // 点击时，播放曲目
        audio.play()
        // 隐藏 play 按钮，显示 pause 按钮
        removeClassAll('unshown')
        playButton.classList.add('unshown')
    })
}
// 暂停功能
var bindPause = function(audio) {
    // 取得暂停按钮
    var pauseButton = e('.player-controls__btn_pause')
    bindEvent(pauseButton, 'click', function(){
        // 点击时，暂停曲目
        audio.pause()
        // 隐藏 pause 按钮，显示 play 按钮
        removeClassAll('unshown')
        pauseButton.classList.add('unshown')
    })
}
// 下一首
var bindNext = function(audio) {
    // 取得下一首按钮
    var nextButton = e('.player-controls__btn_next')
    bindEvent(nextButton, 'click', function(event){
        // 点击时，播放曲目
        audio.pause()
        var audioDiv = e('.audio-control')
        var index = (parseInt(audioDiv.dataset.id, 10) + 1) % musicList.length
        changSong(index)
        bindEvent(audio, 'canplay', function() {
            audio.play()
            removeClassAll('unshown')
            var playButton = e('.player-controls__btn_play')
            playButton.classList.add('unshown')
        })

    })
}
// 上一首
var bindPrev = function(audio) {
    // 取得上一首按钮
    var prevButton = e('.player-controls__btn_prev')
    bindEvent(prevButton, 'click', function(event){
        // 点击时，播放曲目
        audio.pause()
        var audioDiv = e('.audio-control')
        var index = (parseInt(audioDiv.dataset.id, 10) - 1 + musicList.length) % musicList.length
        changSong(index)
        bindEvent(audio, 'canplay', function() {
            audio.play()
            removeClassAll('unshown')
            var playButton = e('.player-controls__btn_play')
            playButton.classList.add('unshown')
        })
    })
}
// 绑定所有播放功能
var bindPlayFunction = function() {
    var audio = e('#id-audio-player')
    bindPlay(audio)
    bindPause(audio)
    bindNext(audio)
    bindPrev(audio)
}
// 2. 给播放器选择播放模式
// 增加列表循环播放功能
var circlePlay = function() {
    // 显示按钮被点击
    removeClassAll('pushed-button')
    var circle = e('.circle-button')
    circle.classList.add('pushed-button')
    // 绑定播放事件
    var audio = e('#id-audio-player')
    bindEvent(audio, 'ended', function(){
        var audioDiv = e('.audio-control')
        var index = (parseInt(audioDiv.dataset.id, 10) + 1) % musicList.length
        changSong(index)
        bindEvent(audio, 'canplay', function() {
            audio.play()
            removeClassAll('unshown')
            var playButton = e('.player-controls__btn_play')
            playButton.classList.add('unshown')
        })
    })
}
var bindCircle = function() {
    var circleButton = e('.repeat')
    bindEvent(circleButton, 'click', circlePlay)
}
// 增加随机播放功能
// 随机获取一个 index
var randomIndex = function() {
    var a = Math.random()
    var l = musicList.length
    var index = parseInt(l * a, 10)
    return index
}
var randomPlay = function() {
    // 显示按钮被点击
    removeClassAll('pushed-button')
    var random = e('.random-button')
    random.classList.add('pushed-button')
    // 绑定播放事件
    var audio = e('#id-audio-player')
    bindEvent(audio, 'ended', function(){
        var index = randomIndex()
        changSong(index)
        bindEvent(audio, 'canplay', function() {
            audio.play()
            removeClassAll('unshown')
            var playButton = e('.player-controls__btn_play')
            playButton.classList.add('unshown')
        })
    })
}
var bindRandom = function() {
    var randomButton = e('.shuffle')
    bindEvent(randomButton, 'click', randomPlay)
}
// 3. 给播放器添加播放列表
// 先给 menu 绑定点击事件，展开一个已有曲目的列表
var bindList = function() {
    // 获得 playlist 按钮和列表
    var listButton = e('.playlist')
    var audioList = e('.audio-list')
    bindEvent(listButton, 'click', function(){
        // 开关播放列表
        audioList.classList.toggle('unshown')
    })
}
// 给播放列表中添加 div 的模板
var songTemplate = function(data) {
    var t = `
    <div class="song-${data.id}" data-url="${data.url}">
        <div class="info">
            <div class="img first"></div>
            <div class="titles">
                <h5>${data.name}</h5>
                <p>${data.author}</p>
            </div>
        </div>
        <div class="state">
            <i class="material-icons">play_arrow</i>
        </div>
    </div>
    `
    return t
}
// 每当页面打开时，载入 musicList 中的播放列表
var loadList = function() {
    // 载入播放列表，获取 audio-list 元素并清空
    var list = e('.audio-list')
    list.innerHTML = ''
    // 遍历 musicList
    for (var i = 0; i < musicList.length; i++) {
        // 拿到每首曲目详情
        var data = musicList[i]
        var temp = songTemplate(data)
        // 插入 audio-list 元素
        appendHTML(list,temp)
    }
    changSong(0)
}
// 4. 点右上角的图标退出组件
var bindExit = function() {
    var exitButton = e('.z-depth-1')
    bindEvent(exitButton, 'click', function() {
        window.close()
    })
}

var __main = function() {
    bindPlayFunction()
    bindList()
    loadList()
    bindCircle()
    bindRandom()
    bindExit()
}

__main()
