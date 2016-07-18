describe("player", function() {
  var music_player;

  beforeEach(function() {
    music_player = getTracks();
  });

  it("should be able to play a Song", function() {
    expect(music_player).toBe(true)
  });
});
