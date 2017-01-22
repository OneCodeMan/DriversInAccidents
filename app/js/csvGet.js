$(document).ready(function() {
	d3.csv("/drivers_in_accidents.csv", function(d) {
		return {
			//drv_rec_type: d.drv_rec_type, //crash level record
			//drv_crsh_id: d.drv_crsh_id, //id of crash
			//drv_unit_num: d.drv_unit_num, //id of traffic unit(cop)
			//drv_invl_prty_key: d.drv_invl_prty_key, //unique id to party
			//drv_prty_type: d.drv_prty_type, //type of party(driver, passenger,ped,etc)
			//drv_prty_brth_date: d.drv_prty_brth_date, //party birthdate
			//drv_prty_age: d.drv_prty_age, //party age
			//drv_pos_cd: d.drv_pos_cd, //position of party
			//drv_rstr_use_cd: d.drv_rstr_use_cd, //safety restraint type
			//drv_ab_depl_cd: d.drv_ab_depl_cd, //airbag deployment
			//drv_prty_ejct_ind: d.drv_prty_ejct_ind, //party was ejected from vehicle
			//drv_prty_trap_ind: d.drv_prty_trap_ind, //party was trapped in vehicle after
			//drv_ambl_cd: d.drv_ambl_cd, //id of agency which transported party
			//drv_hosp_cd: d.drv_hosp_cd, //hospital which involved party
			//drv_driv_licn_num: d.drv_driv_licn_num, //driver's license
			//drv_driv_licn_st: d.drv_driv_licn_st, //driver's license state
			//drv_alch_susp_ind: d.drv_alch_susp_ind, //suspicion of influence of alcohol
			//drv_alch_test_rfsd_ind: d.drv_alch_test_rfsd_ind, //refused alc test
			//drv_drug_susp_ind: d.drv_drug_susp_ind, //suspicion of influence of drugs
			//drv_alch_pbt_test_ind: d.drv_alch_pbt_test_ind, //took preliminary breath test
			//drv_alch_brth_test_ind: d.drv_alch_brth_test_ind, //took breathalyzer test
			//drv_alch_urne_test_ind: d.drv_alch_urne_test_ind, //took urine test
			//drv_alch_blod_test_ind: d.drv_alch_blod_test_ind, //took blood test
			//drv_igil_ind: d.drv_igil_ind, //vehicle equiped with ignition lock
			//drv_hzrd_citn_ind: d.drv_hzrd_citn_ind, //given hazardous citation
			//drv_oth_citn_ind: d.drv_oth_citn_ind, //given citation other that hazardous
			//drv_crnt_x_cord: d.drv_crnt_x_cord, //x coord of crash location
			//drv_crnt_y_cord: d.drv_crnt_y_cord, //y coord of crash location
			//drv_cnty_cd: d.drv_cnty_cd, //traffic crash location system code for county
			//drv_date_val: d.drv_date_val, //date of crash
			//drv_milt_time: d.drv_milt_time, //military time of crash
			//location_1: d.location_1 //x,y coords
			drv_gndr_cd: d.drv_gndr_cd, //party's gender
			drv_injy_svty_cd: d.drv_injy_svty_cd, //injury severity
			drv_hzrd_actn_cd: d.drv_hzrd_actn_cd, //hazardous action which contributed to crash
			drv_alch_test_not_ofrd: d.drv_alch_test_not_ofrd, //test not offered
			drv_alch_feld_test_ind: d.drv_alch_feld_test_ind, //took field test
			drv_alch_test_rslt: d.drv_alch_test_rslt, //test results
			drv_drug_blod_test_ind: d.drv_drug_blod_test_ind, //took blood drug test
			drv_drug_urne_test_ind: d.drv_drug_urne_test_ind, //took urine drug test
			drv_drug_test_rslt: d.drv_drug_test_rslt //drug test results
		};
	}, function(data) {
		function search()
		{
			url = "accidents.json";

			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);

			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == XMLHttpRequest.DONE)
				{
					searchSuccess(xhr.responseText);
				}
			}
			xhr.send(null);
		}

		function searchSuccess(response)
		{
			var json = JSON.parse(response);


		for (i = 0; i < data.length; i++) {
			if (data[i].drv_injy_svty_cd == "1") {
				if (data[i].drv_alch_feld_test_ind == "1") {
					if (+data[i].drv_alch_test_rslt > 0.08) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][0]["children"][1]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][0]["children"][1]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][0]["children"][1]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "f") {
							json["children"][0]["children"][0]["children"][1]["children"][1]["children"][1]["size"]++;
						}
					}
				} else if (data[i].drv_alch_feld_test_ind == "0") {
					json["children"][0]["children"][0]["children"][3]["size"]++;
				}
				if (data[i].drv_drug_blod_test_ind == "1" | data[i].drv_drug_urne_test_ind == "1") {
					if (+data[i].drv_drug_test_rslt > 0) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][0]["children"][0]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][0]["children"][0]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][0]["children"][0]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][0]["children"][0]["children"][1]["children"][1]["size"]++;
						}
					}
				} else {
					json["children"][0]["children"][0]["children"][2]["size"]++;
				}
			} else if (data[i].drv_injy_svty_cd == "2") {
				if (data[i].drv_alch_feld_test_ind == "1") {
					if (+data[i].drv_alch_test_rslt > 0.08) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][1]["children"][1]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][1]["children"][1]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][1]["children"][1]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "f") {
							json["children"][0]["children"][1]["children"][1]["children"][1]["children"][1]["size"]++;
						}
					}
				} else if (data[i].drv_alch_feld_test_ind == "0") {
					json["children"][0]["children"][0]["children"][3]["size"]++;
				}
				if (data[i].drv_drug_blod_test_ind == "1" | data[i].drv_drug_urne_test_ind == "1") {
					if (+data[i].drv_drug_test_rslt > 0) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][1]["children"][0]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][1]["children"][0]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][1]["children"][0]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][1]["children"][0]["children"][1]["children"][1]["size"]++;
						}
					}
				} else {
					json["children"][0]["children"][1]["children"][2]["size"]++;
				}
			} else if (data[i].drv_injy_svty_cd == "3") {
				if (data[i].drv_alch_feld_test_ind == "1") {
					if (+data[i].drv_alch_test_rslt > 0.08) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][2]["children"][1]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][2]["children"][1]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][2]["children"][1]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "f") {
							json["children"][0]["children"][2]["children"][1]["children"][1]["children"][1]["size"]++;
						}
					}
				} else if (data[i].drv_alch_feld_test_ind == "0") {
					json["children"][0]["children"][2]["children"][3]["size"]++;
				}
				if (data[i].drv_drug_blod_test_ind == "1" | data[i].drv_drug_urne_test_ind == "1") {
					if (+data[i].drv_drug_test_rslt > 0) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][2]["children"][0]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][2]["children"][0]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][2]["children"][0]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][2]["children"][0]["children"][1]["children"][1]["size"]++;
						}
					}
				} else {
					json["children"][0]["children"][2]["children"][2]["size"]++;
				}
			} else if (data[i].drv_injy_svty_cd == "4") {
				if (data[i].drv_alch_feld_test_ind == "1") {
					if (+data[i].drv_alch_test_rslt > 0.08) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][3]["children"][1]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][3]["children"][1]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][3]["children"][1]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "f") {
							json["children"][0]["children"][3]["children"][1]["children"][1]["children"][1]["size"]++;
						}
					}
				} else if (data[i].drv_alch_feld_test_ind == "0") {
					json["children"][0]["children"][3]["children"][3]["size"]++;
				}
				if (data[i].drv_drug_blod_test_ind == "1" | data[i].drv_drug_urne_test_ind == "1") {
					if (+data[i].drv_drug_test_rslt > 0) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][3]["children"][0]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][3]["children"][0]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][3]["children"][0]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][3]["children"][0]["children"][1]["children"][1]["size"]++;
						}
					}
				} else {
					json["children"][0]["children"][3]["children"][2]["size"]++;
				}
			} else if (data[i].drv_injy_svty_cd == "5") {
				if (data[i].drv_alch_feld_test_ind == "1") {
					if (+data[i].drv_alch_test_rslt > 0.08) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][4]["children"][1]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][4]["children"][1]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][4]["children"][1]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "f") {
							json["children"][0]["children"][4]["children"][1]["children"][1]["children"][1]["size"]++;
						}
					}
				} else if (data[i].drv_alch_feld_test_ind == "0") {
					json["children"][0]["children"][4]["children"][3]["size"]++;
				}
				if (data[i].drv_drug_blod_test_ind == "1" | data[i].drv_drug_urne_test_ind == "1") {
					if (+data[i].drv_drug_test_rslt > 0) {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][4]["children"][0]["children"][0]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][4]["children"][0]["children"][0]["children"][1]["size"]++;
						}
					} else {
						if (data[i].drv_gndr_cd == "M") {
							json["children"][0]["children"][4]["children"][0]["children"][1]["children"][0]["size"]++;
						} else if (data[i].drv_gndr_cd == "F") {
							json["children"][0]["children"][4]["children"][0]["children"][1]["children"][1]["size"]++;
						}
					}
				} else {
					json["children"][0]["children"][4]["children"][2]["size"]++;
				}
			}
		}
	}
	search();

	});
});
