# Article Filter Exercise

## Description

Given an initial functionality with a filter input and the list of articles. Complete the functionality by adding the following:

- When the user types in the filter input, the article list should be filtered and display the list of articles that contain the typed string.
- The found string(s) in each article should be highlighted as in the following image.
- Partial words, including individual letters, should be highlighted.
- The highlighted strings should at least have white color and red background.

## Requirements

1. **Filtering**: Filter articles based on user input
2. **Highlighting**: Highlight matching text with white text on red background
3. **Partial matching**: Support partial word and letter matching
4. **Case insensitive**: Matching should work regardless of case

## Example

When user types "league" in the filter input:
- "Nelsons folly list account **league**" (league highlighted)
- "Gold Road **league** chase skysail" (league highlighted)

## HTML Structure

```html
<div class="container">
  <input type="text" name="filter" id="filterInput">
  <ul id="articles">
    <li>Parley matey Davy Jones Locker</li>
    <li>Parley handsomely kick Jack Tar</li>
    <li>Holystone careen Shiver me jack</li>
    <li>Nelsons folly list account league</li>
    <li>Gold Road league chase skysail</li>
    <li>Keel crimp holystone fluke yo-ho-ho</li>
    <li>Grog heave to crimp line warp</li>
    <li>Pressgang grog blossom</li>
    <li>Lubber crack Jennys chase guns pink</li>
    <li>Hearties aye Chain Shot parley</li>
  </ul>
</div>
```

## CSS Requirements

```css
.highlight {
  background-color: red;
  color: white;
}

.hidden {
  display: none;
}
```

## JavaScript Implementation

The exercise requires implementing:
1. Event listener for input changes
2. Filtering logic to show/hide articles
3. Text highlighting functionality
4. Debouncing for better performance

## Skills Practiced

- DOM manipulation
- Event handling
- String manipulation
- CSS styling
- Performance optimization (debouncing)
