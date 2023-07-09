npx sequelize-cli model:generate --name products --attributes id:uuid,productName:string,productCode:string,isArchived:time,
npx sequelize-cli model:generate --name accounts --attributes id:uuid,productId:uuid,fullName:string,email:string,mobile:string,countryCode:string,customerId:string,password:string,isActive:boolean,emailVerified:boolean,phoneVerified:boolean,accountType:string,lastLoggedIn:time,uttr:string,isArchived:time,isEarnedToday:boolean,createdBy:uuid
npx sequelize-cli model:generate --name wings --attributes id:uuid,accountId:uuid,wingSide:string,leftWingId:uuid,rightWingId:uuid,rightWingCount:double,leftWingCount:double,isFreezedWing:boolean,isVerified:boolean,verifiedBy:uuid,verifiedAt:time,lifeTimeEarning:double,dayEarning:double
npx sequelize-cli model:generate --name bankaccounts --attributes id:uuid,accNo:string,ifsc:string,micr:string,accountHolderName:string,branch:string
npx sequelize-cli model:generate --name settings --attributes id:uuid,achievements:jsonb,wingThreshold:double


