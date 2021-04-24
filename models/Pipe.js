const pips = []

export default class Pipe {
    constructor(canvas){
        this.x = canvas.width
        this.pipeHeight = 320
        this.y = Math.floor(Math.random() * this.pipeHeight) - this.pipeHeight
        this.pipeColor = `#${(Math.random().toString(16)+'000000').substring(2,8).toUpperCase()}`
        this.pipeWidth = +`${Math.floor(Math.random()*(Math.floor(60) - Math.ceil(20))) + Math.ceil(20)}`
    }

    static getPips(){
        return pips
    }

    static addPipe(pipe){
        return pips.push(pipe)
    }

    createPipe(i, ctx){
        ctx.fillStyle = pips[i].pipeColor
        ctx.fillRect(pips[i].x, pips[i].y, pips[i].pipeWidth || 50, pipeHeight);
        ctx.fillRect(pips[i].x, pips[i].y + pipeHeight + 90, pips[i].pipeWidth);
    }
}

