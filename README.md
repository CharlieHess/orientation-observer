# orientation-observer
Allows you to render components selectively based on aspect ratio.

## How so?
It listens for window `resize` events and compares `window.innerWidth` and `window.innerHeight`. If height is greater, only components with `orientation='portrait'` will be rendered. If width is greater, components with `orientation='landscape'` will be rendered. This is inspired by https://github.com/zeroseven/react-screen-orientation, but instead of using `@media` queries for detecting orientation we'll just use window size.

## Quick-start

```
npm install orientation-observer
```

```javascript
import React, { Component } from 'react'

import { AspectRatioObserver, Orientation } from 'orientation-observer'

class App extends Component {
  render () {
    return (
      <AspectRatioObserver>
        {/* Will only be in DOM in landscape */}
        <Orientation orientation='landscape' alwaysRender={false}>
          <div>
            <p>Only visible in landscape</p>
          </div>
        </Orientation>
        {/* Will stay in DOM, but is only visible in portrait */}
        <Orientation orientation='portrait'>
          <div>
            <p>Please rotate your device</p>
          </div>
        </Orientation>
      </AspectRatioObserver>
    );
  }
}
```