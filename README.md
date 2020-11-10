# Code challenge for Job Interview

# Goal

Read/learn documents in the references section about header bidding. 

Implement the following challenges **as possible as you can**.

Please keep your codes and environments, it would be nice to present your pages and codes in the interview.

# Challenges

- **Challenge A**

    Implement a html page to display **an ad** with Prebid.js and googletag integrated based on the **'Basic Prebid.js Example'** from Prebid.js.

    The size of the ad should be with the width of 728 and the height of 90

    Here is the expected output:

    ![images/challengeA.png](images/challengeA.png)

- **Challenge B**

    On top of the challenge A, implement another ad in 'div-2', the ad should be delivered from the provided bid server simulator.

    - Here are the information to establish the  bid server simulator by Node.js:

        The entry of the bid server is at `./bid-server/server.js` .

        It exposes two endpoints:

        - `/static` - To make static html pages assessable via the bid server
        - `/bids` - To receive bids requests from the yieldloveBidAdapter in Prebid.js and response bids

        The endpoints must be accessible via the domain of `[test.yieldlove.com:20457](http://test.yieldlove.com:20457)` ,

        It's required to map 127.0.0.1 to `[test.yieldlove.com:20457](http://test.yieldlove.com:20457)` locally. It's can be done via modifying the hosts file.

    - A local built Prebid.js with the provided yieldloveBidAdapter.js under the `resources` folder is needed.
        - Build Prebid.js locally and use the built Prebid.js to display ads. Please refer to 'Build Prebid.js locally for tests' in the References section for more information.
        - Enable the Yieldlove bid adapter at the local build.

            The provided yieldloveBidAdapter.js needs to be placed into the `modules` folder.

    - The `window.pbjsYLHH` must refer to `pbjs` before the calling on pbjs.requestBids
    - The html page to display ads should be accessible via the `http://test.yieldlove.com:20457/static`
    - The ad unit code (ad unit path) displayed in the 'div-2' should be `/53015287/yieldlove.com_hb_test_300x250_2`

        Here is the bids configuration:

        ```
        [{
             bidder: 'yieldlove',
             params: {
                placementId: 40882157810
             }
        }]
        ```

        The size should be with the width of 300 and the height of 250

    - It's recommended to turn on Prebid.js debug messages on console to debug. Check more details here:

        https://docs.prebid.org/troubleshooting/troubleshooting-guide.html#turn-on-prebidjs-debug-messages

    Here is the expected output:

    ![images/challengeB.png](images/challengeB.png)

    The cpm in the responded bid is generated randomly.

- **Challenge C**

    Based on **the challenge B, s**et customized targeting key for the GPT slot for `/53015287/yieldlove.com_hb_test_300x250_2` based on received bids.

    - Call `googletag.Slot.setTargeting` to set targeting keys for a specified ad slot. Refer to the Google Tag API for more inforamtion. The `Slot.setTargeting` must be called before the calling on `googletag.pubads().refresh()`
    - Expected keys and values are:
        - Name of the key: `yieldlove_hb_pb`

            Expected value: A rounded number with two decimal from the CPM of the winning bid

            - The rule to round is
                - if the CPM < 20, rounded to 2 decimal
                - if the CPM ≥ 20 and < 60, rounded to 2 decimal with step of each 0.05 euro

                For example:

                ```
                If the CPM is 0.5213124, the value should be 0.52
                If the CPM is 21.21456, the value should be 21.25
                If the CPM is 22.266, the value should be 22.30
                ```

        - Name of the key: `yieldlove_hb_adid`

            Expected value: the adid from the recived bid

        - Name of the key: `yieldlove_hb_placement`

            Expected value: `9859`

- **Challenge D**

    Implement another page to display the ad in the 'Div-2' based on the **challenge B** but **with Prebid.js integrated only (don't use the google tag library)**
    The ad in the Div-1 doesn't need to be displayed.

- **Challenge E**

    Implement another page to display the same ads based on **the challenge B** with **one of the following framework**:
    - Vuejs
    - React
    - Angular

# References

- What is header bidding?

    [https://docs.prebid.org/overview/intro.html#what-is-header-bidding](https://docs.prebid.org/overview/intro.html#what-is-header-bidding)

- Basic Prebid.js Example with googletag integration

    [https://docs.prebid.org/dev-docs/examples/basic-example.html](https://docs.prebid.org/dev-docs/examples/basic-example.html)

- Ad Unit Reference

    [https://docs.prebid.org/dev-docs/adunit-reference.html](https://docs.prebid.org/dev-docs/adunit-reference.html)

- Google Tag API

    [https://developers.google.com/doubleclick-gpt/reference](https://developers.google.com/doubleclick-gpt/reference)

- Build Prebid.js locally for tests

    [https://github.com/prebid/Prebid.js/blob/master/README.md](https://github.com/prebid/Prebid.js/blob/master/README.md)