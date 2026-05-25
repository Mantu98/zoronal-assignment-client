import api from "./api";

export const getCompaniesApi = (
  page:number=1,
  limit:number=10,
  search:string="",
  city:string="",
  sort:string=""
)=>{

return api.get(
"/company",
{
params:{
page,
limit,
search,
city,
sort
}
}
);

};

export const getCompanyByIdApi=(
id:string
)=>{

return api.get(
`/company/${id}`
);

};



