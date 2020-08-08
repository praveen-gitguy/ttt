const axios = require("axios");

exports.getData = async (req, res, next) => {
  try {
    if (isNaN(req.params.n)) {
      throw Error("Please enter a number");
    }

    let sendData = {};
    const response = await axios.get("https://terriblytinytales.com/test.txt");
    const data = response.data;
    const separators = [
      " ",
      "\\+",
      "-",
      "\\(",
      "\\)",
      "\\*",
      "/",
      ":",
      "\\?",
      "\\@",
      "\\.",
      "\\_",
      "\t",
      "\t\t",
      "\n",
      ",",
    ];
    const formattedData = data.split(new RegExp(separators.join("|"), "g"));
    formattedData.forEach((el) => {
      if (!sendData[el]) {
        sendData[el] = 1;
      }
      sendData[el]++;
    });

    const sorted = Object.entries(sendData).sort(
      (current, next) => next[1] - current[1]
    );

    const resData = sorted.filter((el) => {
      return el[0] !== "";
    });

    const newData = [];

    if (!(req.params.n >= 1 && req.params.n <= resData.length)) {
      throw new Error(`Number should be > 0 & <= ${resData.length}`);
    }

    for (let i = 0; i < req.params.n; i++) {
      newData.push(resData[i]);
    }

    res.status(200).json({
      status: "Success",
      data: newData,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      error: err.message,
    });
  }
};
