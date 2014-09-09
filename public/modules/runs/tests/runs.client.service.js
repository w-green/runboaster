describe('runs service', function() {



  it('should query the database for the runs', function(){
    expect(db.query.runs.count).toEqual(3);
  });

});
