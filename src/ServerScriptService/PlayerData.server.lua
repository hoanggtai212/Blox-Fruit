local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)

	-- Tạo bảng dữ liệu
	local data = Instance.new("Folder")
	data.Name = "PlayerData"
	data.Parent = player

	-- Level
	local level = Instance.new("IntValue")
	level.Name = "Level"
	level.Value = 1
	level.Parent = data

	-- EXP
	local exp = Instance.new("IntValue")
	exp.Name = "EXP"
	exp.Value = 0
	exp.Parent = data

	-- Coins
	local coins = Instance.new("IntValue")
	coins.Name = "Coins"
	coins.Value = 100
	coins.Parent = data

	print(player.Name .. " đã vào game!")
	print("Level:", level.Value)
	print("EXP:", exp.Value)
	print("Coins:", coins.Value)

end)
