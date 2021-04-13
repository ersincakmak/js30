const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

const togglePlay = () => {
	if (video.paused) {
		video.play()
	} else {
		video.pause()
	}
}

const updateButton = (e) => {
	const icon = e.target.paused ? '►' : '❚ ❚'
	toggle.textContent = icon
}

const skip = (e) => {
	video.currentTime += parseFloat(e.target.dataset.skip)
}

const handeChangeUpdate = (e) => {
	video[e.target.name] = e.target.value
}

const handleProgress = () => {
	const percent = (video.currentTime / video.duration) * 100
	progressBar.style.flexBasis = `${percent}%`
}

const scrub = (e) => {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
	video.currentTime = scrubTime
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach((item) => {
	item.addEventListener('click', skip)
})

ranges.forEach((item) => {
	item.addEventListener('change', handeChangeUpdate)
})

ranges.forEach((item) => {
	item.addEventListener('mousemove', handeChangeUpdate)
})

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))
