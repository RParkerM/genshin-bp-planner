/* User story 01 - I can enter my current BP level and how much BP I have accumulated to the next level, and then I can see how many BP I need to get to max level.
 */

// TODO: Do this using Puppeteer

(() => {
  const tripleClick = (element) => {
    element.click();
    element.click();
    element.click();
    console.log("clicked three times");
  };

  const type = (selectors, text) => {
    const element = document.querySelector(selectors);
    if (!element) throw `No element found with selector ${selectors}`;
    console.log("element", element);
    text.split("").forEach((key) => {
      element.dispatchEvent(new KeyboardEvent("keydown", { key: key }));
      element.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
    });
  };
  console.log("testing");

  const BPLevelInputSelector = `input[name='curLvl']`;

  const BPLevelInput = document.querySelector(BPLevelInputSelector);
  if (!BPLevelInput) throw "Can't find input with name 'curLvl'";
  const CurrentBPInput = document.querySelector(`input[name='curBPInput']`);
  if (!BPLevelInput) throw "Can't find input with name 'curBPInput'";

  tripleClick(BPLevelInput);
  type(BPLevelInputSelector, "1");
})();
