
	/** Create Option A Age factor array Part 2.
	 *  6-16-2017
	 *  This is for members hired on and after 4-2-2012 
 	 *  For Group 1,2,4 and (Year of Service >= 30  years and Age >= 50 years)
  	 *  if Group 2 and Member's age >= 55 then age + 5. Example: 55 + 5 = 60
	 *  if Group 4 and Member's age >= 50 then age + 10. Example: 50 + 10 = 60
	
	 This is for hired on and after 4-2-2012  with 30 and more years of services	
	 */
	//second set of Option A age factor Array
	//group 1 and 30 yrs plus
	let ARRY_30plusYOS_Group1 = {}
	ARRY_30plusYOS_Group1[36] = "360.00000"
	ARRY_30plusYOS_Group1[37] = "370.00000"
	ARRY_30plusYOS_Group1[38] = "380.00000"
	ARRY_30plusYOS_Group1[39] = "390.00000"
	ARRY_30plusYOS_Group1[40] = "400.00000"
	ARRY_30plusYOS_Group1[41] = "410.00000"
	ARRY_30plusYOS_Group1[42] = "420.00000"
	ARRY_30plusYOS_Group1[43] = "430.00000"
	ARRY_30plusYOS_Group1[44] = "440.00000"
	ARRY_30plusYOS_Group1[45] = "450.00000"
	ARRY_30plusYOS_Group1[46] = "460.00000"
	ARRY_30plusYOS_Group1[47] = "470.00000"
	ARRY_30plusYOS_Group1[48] = "480.00000"
	ARRY_30plusYOS_Group1[49] = "490.00000"
	ARRY_30plusYOS_Group1[50] = "500.00000"
	ARRY_30plusYOS_Group1[51] = "510.00000"
	ARRY_30plusYOS_Group1[52] = "520.00000"
	ARRY_30plusYOS_Group1[53] = "530.00000"
	ARRY_30plusYOS_Group1[54] = "540.00000"
	ARRY_30plusYOS_Group1[55] = "550.00000"
	ARRY_30plusYOS_Group1[56] = "560.00000"
	ARRY_30plusYOS_Group1[57] = "570.00000"
	ARRY_30plusYOS_Group1[58] = "580.00000"
	ARRY_30plusYOS_Group1[59] = "590.00000"
	ARRY_30plusYOS_Group1[60] = "600.01625"
	ARRY_30plusYOS_Group1[61] = "610.01750"
	ARRY_30plusYOS_Group1[62] = "620.01875"
	ARRY_30plusYOS_Group1[63] = "630.02000"
	ARRY_30plusYOS_Group1[64] = "640.02125"
	ARRY_30plusYOS_Group1[65] = "650.02250"
	ARRY_30plusYOS_Group1[66] = "660.02375"
	ARRY_30plusYOS_Group1[67] = "670.02500"
	// Age 67 and over is 2.5


	//Group2 and 30 yrs plus
	let ARRY_30plusYOS_Group2 = {}
	ARRY_30plusYOS_Group2[36] = "360.00000"
	ARRY_30plusYOS_Group2[37] = "370.00000"
	ARRY_30plusYOS_Group2[38] = "380.00000"
	ARRY_30plusYOS_Group2[39] = "390.00000"
	ARRY_30plusYOS_Group2[40] = "400.00000"
	ARRY_30plusYOS_Group2[41] = "410.00000"
	ARRY_30plusYOS_Group2[42] = "420.00000"
	ARRY_30plusYOS_Group2[43] = "430.00000"
	ARRY_30plusYOS_Group2[44] = "440.00000"
	ARRY_30plusYOS_Group2[45] = "450.00000"
	ARRY_30plusYOS_Group2[46] = "460.00000"
	ARRY_30plusYOS_Group2[47] = "470.00000"
	ARRY_30plusYOS_Group2[48] = "480.00000"
	ARRY_30plusYOS_Group2[49] = "490.00000"
	ARRY_30plusYOS_Group2[50] = "500.00000"
	ARRY_30plusYOS_Group2[51] = "510.00000"
	ARRY_30plusYOS_Group2[52] = "520.00000"
	ARRY_30plusYOS_Group2[53] = "530.00000"
	ARRY_30plusYOS_Group2[54] = "540.00000"
	ARRY_30plusYOS_Group2[55] = "550.01625"
	ARRY_30plusYOS_Group2[56] = "560.01750"
	ARRY_30plusYOS_Group2[57] = "570.01875"
	ARRY_30plusYOS_Group2[58] = "580.02000"
	ARRY_30plusYOS_Group2[59] = "590.02125"
	ARRY_30plusYOS_Group2[60] = "600.02250"
	ARRY_30plusYOS_Group2[61] = "610.02375"
	ARRY_30plusYOS_Group2[62] = "620.02500"
	ARRY_30plusYOS_Group2[63] = "630.02500"
	ARRY_30plusYOS_Group2[64] = "640.02500"
	ARRY_30plusYOS_Group2[65] = "650.02500"
	ARRY_30plusYOS_Group2[66] = "660.02500"
	ARRY_30plusYOS_Group2[67] = "670.02500"
	// Age 62 and over is 2.5

	//Group4 and 30 yrs plus
	let ARRY_30plusYOS_Group4 = {}
	ARRY_30plusYOS_Group4[36] = "360.00000"
	ARRY_30plusYOS_Group4[37] = "370.00000"
	ARRY_30plusYOS_Group4[38] = "380.00000"
	ARRY_30plusYOS_Group4[39] = "390.00000"
	ARRY_30plusYOS_Group4[40] = "400.00000"
	ARRY_30plusYOS_Group4[41] = "410.00000"
	ARRY_30plusYOS_Group4[42] = "420.00000"
	ARRY_30plusYOS_Group4[43] = "430.00000"
	ARRY_30plusYOS_Group4[44] = "440.00000"
	ARRY_30plusYOS_Group4[45] = "450.00000"
	ARRY_30plusYOS_Group4[46] = "460.00000"
	ARRY_30plusYOS_Group4[47] = "470.00000"
	ARRY_30plusYOS_Group4[48] = "480.00000"
	ARRY_30plusYOS_Group4[49] = "490.00000"
	ARRY_30plusYOS_Group4[50] = "500.01625"
	ARRY_30plusYOS_Group4[51] = "510.01750"
	ARRY_30plusYOS_Group4[52] = "520.01875"
	ARRY_30plusYOS_Group4[53] = "530.02000"
	ARRY_30plusYOS_Group4[54] = "540.02125"
	ARRY_30plusYOS_Group4[55] = "550.02250"
	ARRY_30plusYOS_Group4[56] = "560.02375"
	ARRY_30plusYOS_Group4[57] = "570.02500"
	ARRY_30plusYOS_Group4[58] = "580.02500"
	ARRY_30plusYOS_Group4[59] = "590.02500"
	ARRY_30plusYOS_Group4[60] = "600.02500"
	ARRY_30plusYOS_Group4[61] = "610.02500"
	ARRY_30plusYOS_Group4[62] = "620.02500"
	ARRY_30plusYOS_Group4[63] = "630.02500"
	ARRY_30plusYOS_Group4[64] = "640.02500"
	ARRY_30plusYOS_Group4[65] = "650.02500"
	ARRY_30plusYOS_Group4[66] = "660.02500"
	ARRY_30plusYOS_Group4[67] = "670.02500"
	// Age 57 and over is 2.5


export default {
	ARRY_30plusYOS_Group1: ARRY_30plusYOS_Group1,
	ARRY_30plusYOS_Group2: ARRY_30plusYOS_Group2,
	ARRY_30plusYOS_Group4: ARRY_30plusYOS_Group4
}