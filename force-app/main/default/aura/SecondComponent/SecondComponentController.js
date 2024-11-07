({
  searchAcount1: function (component, event, helper) {
    helper
      .searchAccounts(component, document.getElementById("first").value)
      .then(function (result) {
        let arr = result.contacts;
        let dd = new Map();

        if (!arr) {
          alert("Not Found");
          return;
        }

        for (let it of arr) {
          dd.set(it.Id, it);
        }

        component.set("v.accountId1", result.accounts);
        component.set("v.contactMap1", dd);
        component.set("v.cntfirst", result.countOfContact);

        helper.setOnViewAgain(component);
      });
  },

  searchAcount2: function (component, event, helper) {
    helper
      .searchAccounts(component, document.getElementById("second").value)
      .then(function (result) {
        let arr = result.contacts;
        let dd = new Map();

        if (!arr) {
          alert("Not Found");
          return;
        }

        for (let it of arr) dd.set(it.Id, it);

        component.set("v.accountId2", result.accounts);
        component.set("v.contactMap2", dd);
        component.set("v.cntsecond", result.countOfContact);

        helper.setOnViewAgain(component);
      });
  },

  searchEventH1: function () {},

  searchEventH2: function () {},

  dragStart: function (component, event, helper) {
    event.dataTransfer.setData("CoId", event.target.getAttribute("id"));
  },

  dragOver: function (component, event, helper) {
    event.preventDefault();
  },

  onDrop1: function (component, event, helper) {
    event.preventDefault();

    let data = event.dataTransfer.getData("CoId");

    if (component.get("v.contactMap1").has(data)) return;

    helper
      .updateValues(component, data, 1)
      .then(function (result) {
        component.set("v.cntfirst", component.get("v.cntfirst") + 1);
        component.set("v.cntsecond", component.get("v.cntsecond") - 1);
        helper.setOnViewAgain(component);
      })
      .catch(function (err) {
        console.log("Error");
      });

    return;
  },

  onDrop2: function (component, event, helper) {
    event.preventDefault();

    let data = event.dataTransfer.getData("CoId");

    if (component.get("v.contactMap2").has(data)) return;

    helper
      .updateValues(component, data, 2)
      .then(function (result) {
        component.set("v.cntfirst", component.get("v.cntfirst") - 1);
        component.set("v.cntsecond", component.get("v.cntsecond") + 1);
        helper.setOnViewAgain(component);
      })
      .catch(function (err) {
        console.log("Error");
      });

    return;
  }
});