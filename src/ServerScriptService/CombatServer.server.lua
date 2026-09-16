local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remotes = ReplicatedStorage:FindFirstChild("Remotes")

if not remotes then
	remotes = Instance.new("Folder")
	remotes.Name = "Remotes"
	remotes.Parent = ReplicatedStorage
end

local combatEvent = remotes:FindFirstChild("CombatEvent")

if not combatEvent then
	combatEvent = Instance.new("RemoteEvent")
	combatEvent.Name = "CombatEvent"
	combatEvent.Parent = remotes
end

local DAMAGE = 10
local ATTACK_DISTANCE = 12

combatEvent.OnServerEvent:Connect(function(player, enemy)

	if typeof(enemy) ~= "Instance" then
		return
	end

	if not enemy:IsDescendantOf(workspace) then
		return
	end

	local character = player.Character
	local playerRoot = character and character:FindFirstChild("HumanoidRootPart")

	local enemyRoot = enemy:FindFirstChild("HumanoidRootPart")
	local enemyHumanoid = enemy:FindFirstChildOfClass("Humanoid")

	if not playerRoot or not enemyRoot or not enemyHumanoid then
		return
	end

	if enemyHumanoid.Health <= 0 then
		return
	end

	local distance = (playerRoot.Position - enemyRoot.Position).Magnitude

	if distance > ATTACK_DISTANCE then
		return
	end

	enemyHumanoid:TakeDamage(DAMAGE)

	print(player.Name .. " đánh " .. enemy.Name)
end)
