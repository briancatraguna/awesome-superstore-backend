const db = require("../database/database");

class ProductAccessor {
  static async findAllProducts() {
    const queryStr = `
    select  concat(p.product_id , '-' , p.market)  
                as id,
            p.product_id 
                as product_id,
            p.product_name 
                as product_name,
            p.unit_price as price,
            case when p.market = 1 then 'USCA'
                when p.market = 2 then 'Asia Pacific'
                when p.market = 3 then 'Europe'
                when p.market = 4 then 'Africa'
                when p.market = 5 then 'LATAM'  
                else ""
            end 
                as market,
            (select category_name from pkbc_category c where c.category_id = s.category_id )
                as category_name,
            s.sub_category_name 
                as sub_category_name 
        from pkbc_product p 
        inner join pkbc_sub_category s on  p.sub_category_id = s.sub_category_id
              order by p.product_name;
    `;
    const [result] = await db.query(queryStr, []);
    return result;
  }

  // static async insert(name, segment, email, password) {
  //   const queryStr = 'CALL USP_UpsertCustomer(?,?,?,?)';
  //   const [result] = await db.query(queryStr, [
  //     name,
  //     segment,
  //     email,
  //     password
  //   ]);
  //   return result[0][0].cust_id;
  // }
  // static async findOneById(customerId) {
  //   const [result] = await db.execute('CALL USP_GetCustomerById(?)',[customerId]);
  //   if (result[0].length == 0) return null;
  //   return result[0][0];
  // }
  // static async findOneByEmail(email) {
  //   const [result] = await db.execute('CALL USP_GetCustomerByEmail(?)',[email]);
  //   if (result[0].length == 0) return null;
  //   return result[0][0];
  // }
}

module.exports = ProductAccessor;
