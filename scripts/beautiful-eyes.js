// the model that describes each eye that is created
var BeautifulEye = function(parentContainer, settings) {
    var self = this;

    if (null == settings) {
        console.log("you're killing me, you gotta pass in some settings if you want this to work");
        return;
    }
    self.parentContainer = parentContainer;
    self.settings = settings;
    if(!self.settings.position || !self.settings.position.x || !self.settings.position.y) {
        console.log("position must be set when creating eyes; what am I, a mind reader");
        return;
    }
    if(!self.settings.size) {
        console.log("size must be set when creating eyes. Give me a break here.");
        return;
    }
    self.settings.id = 'beautiful-eye' + self.settings.rawId;
    self.settings.eyeBallSize = self.settings.eyeBallSize || 4;
    self.settings.borderWidth = self.settings.borderWidth || 2;
    self.settings.eyeBallDistanceFromCenter = self.settings.eyeBallDistanceFromCenter || (self.settings.size / 3);

    // generates html to display the eye
    self.create = function() {
        var halfSize = self.settings.size / 2;
        var posX = self.settings.position.x - halfSize;
        var posY = self.settings.position.y - halfSize;
        $(self.parentContainer).prepend($('<div>', {
            id: self.settings.id,
            class: 'beautiful-eye',
            style: 'height: ' + self.settings.size + 'px; width: ' + self.settings.size + 'px; left: ' + posX + 'px; top: ' + posY + 'px; border-radius: ' + (halfSize + self.settings.borderWidth) +'px; border-width: ' + self.settings.borderWidth + 'px;'
        }).prepend($('<span>', {
            class: 'eye-ball',
            style: 'height: ' + self.settings.eyeBallSize + 'px; width: ' + self.settings.eyeBallSize + 'px; left: ' + halfSize + 'px; top: ' + halfSize + 'px; border-radius: ' + ((self.settings.eyeBallSize / 2) + 1) +'px;'
        })));
    }
    self.create();

    // the goal here is to move the eye ball so it looks like the eye is looking in the direction of the cursor
    // to do that, get the postition of the eye's center and the mouse position and work out the angle between the two points,
    // then move the eye ball a certain distance from the eye's center along that angle
    self.notifyOfMouseMove = function(event) {
        // get the x and y of our eye at the page level
        var rect = $(self.parentContainer).find('#'+self.settings.id)[0].getBoundingClientRect();
        // figure out if the page is scrolled, we have to add this to our y position later
        var dsoctop=document.all? iebody.scrollTop : pageYOffset;
        
        // work out the angle between where our eye is centered and the current mouse position
        var delta_x = event.pageX - (rect.left + (self.settings.size / 2));
        var delta_y = event.pageY - (rect.top + (self.settings.size / 2) + dsoctop);
        var theta_radians = Math.atan2(delta_y, delta_x)

        // how far do we want the eye ball to move from the center of the eye?
        var distance = self.settings.eyeBallDistanceFromCenter;

        // what is the adjacent (X)
        var adjacent = Math.cos(theta_radians) * distance;
        // what is the opposite (Y)
        var opposite = Math.sin(theta_radians) * distance;
        // move our eyeball to the correct position, it's already within the eye, so the center is half the size of the eye,
        // then we need to take off half the size of the eye ball to center that. Then we apply the adjacent and opposite we just worked out to move it off center
        var ballerX = adjacent+ (self.settings.size / 2) - (self.settings.eyeBallSize / 2);
        var ballerY = opposite+ (self.settings.size / 2) - (self.settings.eyeBallSize / 2);
        $('#' + self.settings.id).find('.eye-ball').css({
            top: ballerY + "px",
            left: ballerX + "px"
        });
    };
    // make it so when the mouse moves we know and can move our eye ball to follow the cursor
    $("html").mousemove(function(event) {
        self.notifyOfMouseMove(event);
    });
};

var allEyes = [];   // a collection of all the eyes we've created, which we don't really need, but like the NSA I must collect everything

// wrapper to create as jquery function
$.fn.makeEye = function(settings) {
    settings.rawId = allEyes.length;    // we want each eye to have a unique id, so we just going to use the count of created eyes
    var newBeautifulEye = new BeautifulEye($(this),settings)
    allEyes.push(newBeautifulEye);
};