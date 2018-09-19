'use strict';

// ------------  Vector  ------------
class Vector {
    constructor (x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    plus (vector){
        if (vector instanceof Vector){
            return new Vector(this.x + vector.x, this.y + vector.y);
        } else {
            throw new Error('Можно прибавлять к вектору только вектор типа Vector');
        }
    }

    times (multiplier){
        return new Vector(this.x * multiplier, this.y * multiplier);
    }
}

// ------------  Vector  ------------
class Actor {
    constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed = new Vector(0, 0)) {
        if (pos instanceof Vector && size instanceof Vector && speed instanceof Vector){
            this.pos = pos;
            this.size = size;
            this.speed = speed;

            Object.defineProperty(this, 'act', {
                writable: true,
                value: function(){}
            });

            Object.defineProperty(this, 'left', {
                get: function() {
                    return this.pos.x;
                }
            });

            Object.defineProperty(this, 'right', {
                get: function() {
                    return this.pos.x + this.size.x;
                }
            });

            Object.defineProperty(this, 'top', {
                get: function() {
                    return this.pos.y;
                }
            });

            Object.defineProperty(this, 'bottom', {
                get: function() {
                    return this.pos.y + this.size.y;
                }
            });

            Object.defineProperty(this, 'type', {
                writable: false,
                value: 'actor'
            });
        } else {
            throw new Error('Аргументы для создания объекта Actor должны быть типа Vector');
        }

    }

    isIntersect(checkActor){
        if (checkActor instanceof Actor){
            return this !== checkActor ?((this.right > checkActor.left) && (this.left < checkActor.right) &&
                (this.bottom > checkActor.top) && (this.top < checkActor.bottom)) : false;
        } else {
            throw new Error('Аргумент функции isIntersect должн быть типа Actor');
        }
    }
}

// ------------  Level  ------------
class Level {
    constructor(grid, actors){
        this.grid = grid;
        this.actors = actors;

        this.player = this.grid !== undefined && this.actors !== undefined ? this.actors.find(
            actor => actor.type === 'player'
        ) : undefined;
        this.height = this.grid !== undefined ? this.grid.length : 0;
        this.width = this.grid !== undefined ? Math.max.apply(null, this.grid.map(
            function(gridRow){
                return gridRow.length
            })) : 0;
        this.status = null;
        this.finishDelay = 1;
    }

    isFinished() {
        return this.status !== null && this.finishDelay < 0;
    }

    actorAt(checkActor) {
        if (checkActor instanceof Actor){
            this.actors.forEach(actor => {
                if (checkActor.isIntersect(actor) && checkActor !== actor) {
                    return actor;
                }
            });
            return undefined;
        } else {
            throw new Error('Аргумент функции actorAt должн быть типа Actor');
        }
    }

    obstacleAt(destination, size){

    }
}

const a = new Level();
console.log(a);


































