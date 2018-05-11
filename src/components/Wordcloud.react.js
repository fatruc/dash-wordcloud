import React, { Component } from 'react';
import PropTypes from 'prop-types';
// requires wordcloud package
import WordCloud from 'wordcloud';

export default class Wordcloud extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var el = this.refs['my-canvas']

        var newCanvas = document.createElement('canvas');
        newCanvas.height = this.props.height;
        newCanvas.width = this.props.width;
        newCanvas.id = 'canvas';
        el.appendChild(newCanvas);
        this.newLabel(el);
        this.WC = new WordCloud(el.firstChild, this.props);
    }

    render() {
        return (
            <div ref="my-canvas">
          </div>
        );
    }

    newLabel(el) {
        var newDiv = document.createElement('div');
        var newSpan = document.createElement('span');
        newDiv.id = 'wcLabel';
        newSpan.id = 'wcSpan';
        el.appendChild(newDiv);
        document.getElementById('wcLabel').appendChild(newSpan);
    }

}



Wordcloud.propTypes = {
    /**
     * The ID used to identify this compnent in Dash callbacks
     */
    id: PropTypes.string,
    /**
     * Width of the canvas
     * Default: 1024
     */
    style: PropTypes.object,

    options: PropTypes.object,
    /**
     * List of words/text to paint on the canvas in a 2-d array, 
     * in the form of [word, size], e.g. [['foo', 12], ['bar', 6]].
     * Default: Les Misérables
     */
    list: PropTypes.arrayOf(PropTypes.array),
    /**
     * Callback to call when the cursor enters or 
     * leaves a region occupied by a word.
     * The callback will take arguments callback(item, dimension, event),
     * where event is the original mousemove event.
     * Default: hover function with text frame and word frequency tooltip
     */
    hover: PropTypes.func,
    /**
     * Callback to call when the user clicks on a word.
     * The callback will take arguments callback(item, dimension, event),
     * where event is the original click event.
     * Default: null
     */
    click: PropTypes.func
};

Wordcloud.defaultProps = {
    width: 1024,
    height: 960,
    list: [
        ['Les Misérables', 30], ['Victor Hugo', 20], ['Jean Valjean', 15],
        ['Javert', 15], ['Fantine', 15], ['Cosette', 15],
        ['Éponine', 12], ['Marius', 12], ['Enjolras', 12],
        ['Thénardiers', 10], ['Gavroche', 10], ['Bishop Myriel', 10],
        ['Patron-Minette', 10], ['God', 10], ['ABC Café', 10],
        ['paris', 8], ['Digne', 8], ['Elephant of the Bastille', 8],
        ['silverware', 5], ['Bagne of Toulon', 5], ['loaf of bread', 5],
        ['Rue Plumet', 5], ['revolution', 5], ['barricade', 5],
        ['sewers', 4], ['Fex urbis lex orbis', 4]
    ],
    options = {},

    hover: function(item, dimension, event) {
        var el = document.getElementById('wcLabel');
        if (!item) {
          el.setAttribute('hidden', true);
      
          return;
        }
      
        el.removeAttribute('hidden');
      
        el.style.left = dimension.x + event.srcElement.offsetLeft + 'px';
        el.style.top = dimension.y + event.srcElement.offsetTop + 'px';
        el.style.width = dimension.w + 'px';
        el.style.height = dimension.h + 'px';
      
        this.hoverDimension = dimension;
      
        document.getElementById('wcSpan').setAttribute(
          'data-l10n-args', JSON.stringify({ word: item[0], count: item[1] }));
        document.getElementById('wcSpan').innerHTML =item[0]+':' + item[1];
      
      },
      click: null
    // click: function(item) {
    //     alert(item[0] + ': ' + item[1]);
    //   }

}