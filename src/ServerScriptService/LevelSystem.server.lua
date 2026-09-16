local Players = game:GetService("Players")

-- EXP cần để lên level
local function getRequiredEXP(level)
	return level * 100
end

-- Hàm cộng EXP
local function addEXP(player, amount)
	local data = player:FindFirstChild("PlayerData")
	if not data then
		return
	end

	local level = data:FindFirstChild("Level")
	local exp = data:FindFirstChild("EXP")

	if not level or not exp then
		return
	end

	exp.Value += amount

	-- Kiểm tra lên level
	while exp.Value >= getRequiredEXP(level.Value) do
		exp.Value -= getRequiredEXP(level.Value)
		level.Value += 1

		print(player.Name .. " đã lên Level " .. level.Value)
	end
end

Players.PlayerAdded:Connect(function(player)

	-- Chờ PlayerData được tạo
	local data = player:WaitForChild("PlayerData")

	-- Test: cho 50 EXP khi vào game
	task.wait(2)
	addEXP(player, 50)

end)

-- Cho các script khác sử dụng hàm cộng EXP
_G.AddEXP = addEXP
_G.GetRequiredEXP = getRequiredEXP
