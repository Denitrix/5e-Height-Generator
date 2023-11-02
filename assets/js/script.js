$("#raceSelect").on("change", function () {
  console.clear();
  console.log($(this).val());
  if ($(this).val() == "Custom") {
    $("input").each((index, element) => {
      //enables all input boxes
      $(element).prop("disabled", false);
      $(element).val("");
    });
  } else {
    const data = $("#raceSelect").find(":selected").data("info");
    console.log(data);
    $("input").each((index, element) => {
      //disables all input boxes and sets their values to the apropiate data values
      const id = $(element).attr("id");
      $(element).prop("disabled", true);
      $(element).val(data[id]);
    });
    $("#heightBase").val(data["heightBase"] + '"');
  }
});

$("#rollCustom").on("click", () => {
  let height = toInches($("#heightBase").val());
  //   console.log("Base Height:", height, "in.");
  const heightMod = rollDice($("#heightMod").val());
  console.log("Height Modifier:", heightMod, "in.");
  height += heightMod;
  let weight = Number(
    $("#weightBase").val().replace("lb", "").replace("s", "").replace(".", "") //removes lbs. from weight and changes it to a number
  );
  //   console.log("Base Weight:", weight, "lbs.");
  const weightMod = rollDice($("#weightMod").val()) * heightMod;
  console.log("Weight Modifier:", weightMod, "lbs.");
  weight += weightMod;
  $("#rolledHeight").text(toFeet(height));
  $("#rolledWeight").text(weight + " lbs.");
  console.log("Total Height:", height, "in.");
  console.log("Total Weight:", weight, "lbs.");
});

function rollDice(dice) {
  //takes in a number and type of dice (in xdy format) and retrns the total result of the roll
  let result = 0;
  if (dice.includes("d")) {
    const diceNum = Number(dice.split("d")[0]);
    const diceType = Number(dice.split("d")[1]);
    console.log("Rolling:", diceNum + "d" + diceType);
    for (i = 0; i < diceNum; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      result += roll;
      console.log("Roll " + (i + 1) + ":", roll);
    }
  } else {
    result = Number(dice);
  }
  return result;
}

function toInches(height) {
  //takes in a length of feet and inches (in x'y" format) and converts it to a number of inches
  if (height === "") {
    height = "0'0";
  }
  const heightArray = height
    .replace('"', "") //removes double quotes from string
    .split("'") //splits string around single quotes
    .filter((i) => i); //removes empty string from array
  height = Number(heightArray[0]) * 12;
  height += Number(heightArray[1]) || 0;
  return height;
}

function toFeet(height) {
  //changes number of inches into feet and inches (in x'y" format)
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  return `${feet}'${inches}"`;
}

/* //changes select size to add scrollbar
$("select").on("focus", function () {
  this.size = 5;
});

$("select").on("change", function () {
  this.blur();
});

$("select").on("blur", function () {
  this.size = 1;
  this.blur();
});
 */
