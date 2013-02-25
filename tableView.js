(function(_) {

var TableView = window.TableView = function(element, options) {
    var y, item, index, itemHeight, that = this;
    var N = function() {};
    this.preLoadFactor = 1.5;
    this.contentHeight = 0;
    this.realCount = 0;
    this.itemStack = [];
    this.contentTop = 0;
    this.contentBottom = 0;
    this.populateData = [];
    this.firstIndex = 0;
    this.itemCount = options.populateCount();
    this.viewportHeight = options.viewport.height;
    this.populateItem = options.populateItem;
    this.pullRefresh = options.pullRefresh;
    this.pullDownAction = options.pullDownAction || N;
    this.pullDownOffset = 51;
    this.wrapper = $(element);

    _.extend(options, {
        pullDownOffset: that.pullDownOffset,
        onScrollMove: function(position) {
            y = position.y + that.viewportHeight;

            if (position.y < 0 || y > that.contentHeight) return;

            while (y > that.contentBottom) {
                index = that.firstIndex + that.realCount;
                if (index < that.itemCount) {
                    itemHeight = that.getItemHeight(that.firstIndex);
                    if (position.y < (that.contentTop + itemHeight)) {
                        that.append(index);
                    } else {
                        that.transToBottom(index);
                    }
                    if (index + 1 == (that.itemCount - that.preLoadInfo.count)) {
                        that.contentHeight = that.contentBottom + that.preLoadInfo.height;
                        that.setContentSize(window.innerWidth, that.contentHeight);
                    }
                } else {
                    break;
                }
            }
            while (position.y < that.contentTop) {
                if (that.firstIndex > 0) {
                    that.transToTop(that.firstIndex - 1);
                } else {
                    break;
                }
            }
        },
        onGestureChange: function(position) {
            if (position.y < - that.pullDownOffset && !that.pullDown.className.match('flip')) {
                that.pullDown.className = 'flip';
                that.pullDown.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
            } else if (position.y >= - that.pullDownOffset && that.pullDown.className.match('flip')) {
                that.pullDown.className = '';
                that.pullDown.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
            }
        },
        onGestureEnd: function(position) {
            if (position.y >= -that.pullDownOffset) return;
            if (that.pullDown.className.match('flip')) {
                that.updatePullDownOffset(0);
                that.pullDown.className = 'loading';
                that.pullDown.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                that.pullDownAction(function() {
                    that.updatePullDownOffset(that.pullDownOffset);
                    that.pullDown.className = '';
                    that.pullDown.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                });
            }
        }
    });

    this.scrollView = new Scroll.ScrollView(options);
    this.scrollView.size = new Scroll.Size(window.innerWidth, this.viewportHeight);
    Scroll.RootView.sharedRoot.addSubview(this.scrollView);
    this.initialize();
};

TableView.prototype.initialize = function() {
    this.layer = this.scrollView.hostingLayer;

    /*--------------------append to wrapper if sepcified------------------------*/
    if (this.wrapper.length) {
        this.wrapper.append($(this.layer).parent());
    }

    /*--------------------pullRefresh------------------------*/
    if (this.pullRefresh) {
        this.initPullRefresh();
    }

    while (this.realCount != this.itemCount) {

        this.append(this.realCount);

        if (this.viewportHeight <= this.contentBottom) {
            break;
        }
    }

    this.preLoadInfo = this.getPreLoadInfo();

    this.contentHeight = this.estimateContentHeight(this.preLoadInfo.height + this.contentBottom, this.preLoadInfo.count + this.realCount);
    this.setContentSize(window.innerWidth, this.contentHeight);
};

TableView.prototype.initPullRefresh = function() {
    this.pullDown = document.createElement('div');
    this.pullDown.id = 'pullDown';
    this.pullDown.innerHTML = '<span class="pullDownIcon"></span><span class="pullDownLabel">Pull down to refresh...</span>';
    $(this.layer).append(this.pullDown);
};

TableView.prototype.append = function(index) {
    var item, itemLayer, height;
    /*--------------------get the data------------------------*/
    item = this.getPopulateItem(index);
    /*--------------------create element------------------------*/
    itemLayer = document.createElement('div');
    this.layer.appendChild(itemLayer);
    $(itemLayer).attr('class', index);
    $(itemLayer).css('position', 'absolute').css('width', '100%').css('-webkit-transform', 'translate3d(0px, ' + this.contentBottom + 'px , 0px)');
    /*--------------------append the item------------------------*/
    height = this.appendToLayer(itemLayer, item);
    /*--------------------adjust for the item------------------------*/
    this.realCount++;
    this.contentBottom += height;
    this.itemStack.push(index);

    return height;
};

TableView.prototype.remove = function() {
    var height;
    /*--------------------remove the item------------------------*/
    height = this.removeItemLayer();
    /*--------------------adjust for the item------------------------*/
    this.realCount--;
    this.contentBottom -= height;
    this.itemStack.pop();

    return height;
};

TableView.prototype.transToBottom = function(desIndex) {
    var height;
    var srcIndex = this.itemStack.shift();
    var itemLayer = this.getItemLayer(srcIndex);
    var desItem = this.getPopulateItem(desIndex);
    this.firstIndex++;
    /*--------------------adjust the contentTop------------------------*/
    this.contentTop += itemLayer.height();
    /*--------------------update and adjust the contentBottom------------------------*/
    this.itemStack.push(desIndex);
    height = this.updateItem(desItem, itemLayer);
    itemLayer.css('-webkit-transform', 'translate3d(0px, ' + this.contentBottom + 'px , 0px)').attr('class', desIndex);
    this.contentBottom += height;
    return height;
};

TableView.prototype.transToTop = function(desIndex) {
    var height;
    var srcIndex = this.itemStack.pop();
    var itemLayer = this.getItemLayer(srcIndex);
    var desItem = this.getPopulateItem(desIndex);
    this.firstIndex--;
    /*--------------------adjust the contentBottom------------------------*/
    this.contentBottom -= itemLayer.height();
    /*--------------------update and adjust the contentTop------------------------*/
    this.itemStack.unshift(desIndex);
    height = this.updateItem(desItem, itemLayer);
    this.contentTop -= height;
    itemLayer.css('-webkit-transform', 'translate3d(0px, ' + this.contentTop + 'px , 0px)').attr('class', desIndex);
    return height;
};

TableView.prototype.getItemLayer = function(index) {
    return $(this.layer).find('.' + index);
};

TableView.prototype.updateItem = function(desItem, itemLayer) {
    itemLayer.children().remove();
    return itemLayer.append(desItem).height();
};

TableView.prototype.appendToLayer = function(dom, item) {
    return $(dom).append(item).height();
};

TableView.prototype.removeItemLayer = function(index) {
    var itemLayer = $(this.layer).children().last();
    var height = itemLayer.height();
    itemLayer.remove();
    return height;
};

TableView.prototype.getItemHeight = function(index) {
    return this.getItemLayer(index).height();
};

TableView.prototype.getPopulateItem = function(index) {
    this.populateData[index] = this.populateData[index] || this.populateItem(index);
    return this.populateData[index];
};

TableView.prototype.getPreLoadInfo = function() {
    var index = Math.round(this.itemCount - this.realCount * this.preLoadFactor);
    var count = 0, height = 0, that = this;
    while (index < this.itemCount) {
        if (index >= this.realCount) {
            height += this.append(index);
            this.remove();
            count++;
        }
        index++;
    }
    return { count: count, height: height};
};

TableView.prototype.updatePullDownOffset = function(offset) {
    this.setPullDownOffset(offset);
    this.scrollView.hostingLayer.style.webkitTransform = Scroll.Utils.t(-this.scrollView._contentOffset.x, -this.scrollView._contentOffset.y - offset);
};

TableView.prototype.estimateContentHeight = function(height, count) {
    return height / count * this.itemCount;
};

/**
 * set and get
 *
 **/

TableView.prototype.setContentSize = function(width, height) {
    this.scrollView.contentSize = new Scroll.Size(width, height);
};

TableView.prototype.getContentSize = function() {
    return this.scrollView.contentSize;
};

TableView.prototype.setSize = function(width, height) {
    this.scrollView.size = new Scroll.Size(width, height);
};

TableView.prototype.getSize = function() {
    return this.scrollView.size;
};

TableView.prototype.setPosition = function(x, y) {
    this.scrollView.position = new Scroll.Point(y, x);
};

TableView.prototype.getPosition = function() {
    return this.scrollView.position;
};

TableView.prototype.setPullDownOffset = function(offset) {
    this.scrollView.pullDownOffset = offset;
};

TableView.prototype.getPullDownOffset = function() {
    return this.scrollView.pullDownOffset;
};

}(_));
