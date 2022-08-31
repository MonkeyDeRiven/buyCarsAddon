

(function () {

    function at_ge60_ConversionTracker() {

        var sendEventWithLastClick = false;
        var waitForJqueryTrials = 0;
        var waitForJqueryMaxTrials = 10;
        var waitForJqueryTimeOut = 500;

        function sendEvent(e) {
            sendEventWithLastClick = true;
            adobe.target.trackEvent({'mbox': e});
            console.log('at_ge60',e);
        }

        function getPageType() {
            return (document.location.pathname.match('/vehicles/detail/') ? 'pdp' : 'plp');
        }

        function trackEvent(e) {
            sendEvent(getPageType() + '_' + e);
            sendEvent(e);
            if (e == 'bid_submit' || e == 'buy_submit') sendEvent('conversion');
        }

        function init() {

            // track clicks on enabled bid- & buy-dialogues

            $(document).on('click', '.c-modal button:enabled', function(){
                if( $(this).attr('data-cy')=='bidbutton') trackEvent('bid_submit');
                if( $(this).attr('data-cy')=='buybutton') trackEvent('buy_submit');
            });

            // track mousedowns on addToWatchlist, Certificate Download or openings on Bid / Buy Dialogues

            document.addEventListener('mousedown', function (e) {
                sendEventWithLastClick = false;
                try {
                    if (e.target) {
                        if (sendEventWithLastClick==false){
                            var classNames = e.target.className || '';
                            if(e.target.childNodes && e.target.childNodes[1] && e.target.childNodes[1].className) classNames+=e.target.childNodes[1].className;
                            if(e.target.nextSibling && e.target.nextSibling.className) classNames+=e.target.nextSibling.className;
                            if (classNames.match('control-eye')) {
                                trackEvent('addtowatchlist');
                            } else if (classNames.match('control-magazine')) {
                                trackEvent('certificate_download');
                            } else if (classNames.match('document-lines-pen')){
                                trackEvent('certificate_download');
                            } else if (classNames.match('control-money-transfer-02')){
                                trackEvent('buy_open');
                            } else if (classNames.match('control-money-transfer')){
                                trackEvent('bid_open');
                            }
                        }
                    }
                } catch (m) {
                    console.log('at_60',m);
                }
            });
        }

        function waitForJquery(){
            waitForJqueryTrials++;
            if(typeof window.jQuery == 'function'){
                init();
            } else if (waitForJqueryTrials <= waitForJqueryMaxTrials){
                window.setTimeout(function(){
                    waitForJquery();
                }, waitForJqueryTimeOut);
            }
        }

        waitForJquery();

    }

    at_ge60_ConversionTracker();

}());


