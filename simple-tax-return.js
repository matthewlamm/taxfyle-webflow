  const statusInfo = [
    {
        status:'s',
        intervals:[
            [0, 9875, 0.1],
            [9875, 40125, 0.12],
            [40125, 85525, 0.22],
            [85525, 163300, 0.24],
            [163300, 207350, 0.32],
            [207350, 518400, 0.35],
            [518400, 900000000, 0.37],
          ],
        deductions:10000
    },
    {
        status:'mfj',
        intervals:[
            [0, 9875, 0.1],
            [9875, 40125, 0.12],
            [40125, 85525, 0.22],
            [85525, 163300, 0.24],
            [163300, 207350, 0.32],
            [207350, 518400, 0.35],
            [518400, 900000000, 0.37],
          ],
        deductions:20000
    }
  ]

  let income = 0;
  let totalTaxes = 0;

  function calculateTaxes(i,s){
    totalTaxes = 0;
    for (const interval of s) {
      if (i < interval[1]) {
        totalTaxes += (i - interval[0]) * interval[2];
        console.log('total taxes: '+totalTaxes);
        break;
      }
      else {
        totalTaxes += (interval[1] - interval[0]) * interval[2];
      }
    }
  }
  
